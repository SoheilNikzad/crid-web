
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/LanguageContext';
import { useWallet } from '@/context/WalletContext';
import { Send, Lock } from 'lucide-react';
import MessageBubble from './MessageBubble';

interface ChatInterfaceProps {
  recipientAddress: string;
  recipientName?: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isEncrypted: boolean;
  isSent: boolean;
  senderAddress: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  recipientAddress, 
  recipientName = 'Unknown' 
}) => {
  const { t, direction } = useLanguage();
  const { address, encryptMessage } = useWallet();
  const [message, setMessage] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! This is a regular message.',
      timestamp: new Date(Date.now() - 60000),
      isEncrypted: false,
      isSent: false,
      senderAddress: recipientAddress
    },
    {
      id: '2',
      content: 'Hi there! This is an encrypted response.',
      timestamp: new Date(Date.now() - 30000),
      isEncrypted: true,
      isSent: true,
      senderAddress: address || '0x0'
    }
  ]);

  const handleSendMessage = async () => {
    if (!message.trim() || !address) return;

    let finalMessage = message;

    if (isEncrypted) {
      // In a real app, we would fetch the recipient's public key
      const mockPublicKey = recipientAddress;
      finalMessage = await encryptMessage(message, mockPublicKey);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: finalMessage,
      timestamp: new Date(),
      isEncrypted,
      isSent: true,
      senderAddress: address
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            timestamp={msg.timestamp}
            isEncrypted={msg.isEncrypted}
            isSent={msg.isSent}
            senderAddress={msg.senderAddress}
          />
        ))}
      </div>

      {/* Message input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className={isEncrypted ? 'text-crypto-primary' : ''}
              >
                <Lock size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsEncrypted(true)}>
                {t('sendEncrypted')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEncrypted(false)}>
                {t('send')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('typeMessage')}
            className={`flex-1 direction-${direction}`}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
