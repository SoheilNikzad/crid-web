
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

// Mock for ethereum object until we add ethers.js or web3.js
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  chainId: string | null;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  shortAddress: string | null;
  generateKeyPair: () => Promise<{ publicKey: string; privateKey: string }>;
  encryptMessage: (message: string, recipientPublicKey: string) => Promise<string>;
  decryptMessage: (encryptedMessage: string, privateKey: string) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
  verifySignature: (message: string, signature: string, address: string) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  chainId: null,
  connecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  shortAddress: null,
  generateKeyPair: async () => ({ publicKey: '', privateKey: '' }),
  encryptMessage: async () => '',
  decryptMessage: async () => '',
  signMessage: async () => '',
  verifySignature: async () => false,
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  // Check if MetaMask is installed
  const checkIfWalletIsInstalled = (): boolean => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Connect wallet function
  const connectWallet = async (): Promise<void> => {
    if (!checkIfWalletIsInstalled()) {
      toast({
        title: "MetaMask is not installed",
        description: "Please install MetaMask browser extension first",
        variant: "destructive",
      });
      return;
    }

    try {
      setConnecting(true);
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        
        // Get chain ID
        const chainId = await window.ethereum!.request({
          method: 'eth_chainId',
        });
        setChainId(chainId);

        // Save to localStorage
        localStorage.setItem('wallet-connected', 'true');
        localStorage.setItem('wallet-address', accounts[0]);

        toast({
          title: "Wallet Connected",
          description: `Connected to ${shortenAddress(accounts[0])}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Connection Error",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
      console.error("Error connecting to wallet:", error);
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = (): void => {
    setAddress(null);
    setChainId(null);
    localStorage.removeItem('wallet-connected');
    localStorage.removeItem('wallet-address');
    toast({
      title: "Wallet Disconnected",
    });
  };
  
  // Generate a shortened version of the address
  const shortenAddress = (address: string): string => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Mock cryptography functions - in a real app you'd use a library like eth-crypto
  // These are placeholders for demonstration
  const generateKeyPair = async (): Promise<{ publicKey: string; privateKey: string }> => {
    // In a real app, this would use proper cryptographic functions
    const mockPrivateKey = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const mockPublicKey = `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    return {
      privateKey: mockPrivateKey,
      publicKey: mockPublicKey
    };
  };

  const encryptMessage = async (message: string, recipientPublicKey: string): Promise<string> => {
    // In a real app, implement asymmetric encryption here
    // This is just a mock for demonstration
    return `encrypted:${message}:with:${recipientPublicKey.substring(0, 10)}`;
  };

  const decryptMessage = async (encryptedMessage: string, privateKey: string): Promise<string> => {
    // In a real app, implement decryption here
    // This is just a mock for demonstration
    return encryptedMessage.split(':')[1] || 'Decrypted message';
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!address || !window.ethereum) return '';
    
    try {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      return '';
    }
  };

  const verifySignature = async (message: string, signature: string, signerAddress: string): Promise<boolean> => {
    // In a real app, implement verification
    // This is just a mock for demonstration
    return true;
  };

  // Initialize wallet connection from localStorage
  useEffect(() => {
    const isConnected = localStorage.getItem('wallet-connected') === 'true';
    const storedAddress = localStorage.getItem('wallet-address');

    if (isConnected && storedAddress && checkIfWalletIsInstalled()) {
      setAddress(storedAddress);
      // Get chain ID
      window.ethereum!.request({
        method: 'eth_chainId',
      }).then(chainId => setChainId(chainId))
        .catch(console.error);
    }
  }, []);

  // Set up wallet event listeners
  useEffect(() => {
    if (!checkIfWalletIsInstalled()) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else if (accounts[0] !== address) {
        // User changed account
        setAddress(accounts[0]);
        localStorage.setItem('wallet-address', accounts[0]);
        toast({
          title: "Account Changed",
          description: `Connected to ${shortenAddress(accounts[0])}`,
        });
      }
    };

    const handleChainChanged = (chainId: string) => {
      setChainId(chainId);
      toast({
        title: "Network Changed",
        description: `Chain ID: ${parseInt(chainId, 16)}`,
      });
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    window.ethereum?.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
    };
  }, [address]);

  return (
    <WalletContext.Provider
      value={{
        isConnected: !!address,
        address,
        chainId,
        connecting,
        connectWallet,
        disconnectWallet,
        shortAddress: address ? shortenAddress(address) : null,
        generateKeyPair,
        encryptMessage,
        decryptMessage,
        signMessage,
        verifySignature,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
