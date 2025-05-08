
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import { useWallet } from '@/context/WalletContext';

interface Contact {
  address: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

const ChatsPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const { isConnected } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  // Mock contacts data
  const [contacts] = useState<Contact[]>([
    {
      address: '0x1234567890123456789012345678901234567890',
      name: 'Alice',
      lastMessage: 'Hey, how are you?',
      timestamp: new Date(Date.now() - 10 * 60000),
      unread: 2,
    },
    {
      address: '0x2345678901234567890123456789012345678901',
      name: 'Bob',
      lastMessage: 'Did you receive my encrypted message?',
      timestamp: new Date(Date.now() - 3 * 3600000),
      unread: 0,
    },
    {
      address: '0x3456789012345678901234567890123456789012',
      name: 'Charlie',
      lastMessage: 'Check out this new crypto project!',
      timestamp: new Date(Date.now() - 2 * 86400000),
      unread: 5,
    },
  ]);

  // Format timestamp as relative time
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-xl font-semibold mb-4">
          {t('connectWallet')}
        </h1>
        <p className="text-muted-foreground">{t('connectWallet')}</p>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col md:flex-row direction-${direction} animate-fade-in`}>
      {/* Contacts sidebar */}
      <div className={`w-full md:w-80 border-r ${selectedContact ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 border-b">
          <div className="relative">
            <Search className={`absolute ${direction === 'ltr' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground`} size={18} />
            <Input 
              placeholder={t('search')}
              className={`pl-10`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div 
                key={contact.address}
                onClick={() => setSelectedContact(contact)}
                className="p-4 border-b hover:bg-muted/50 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatTimestamp(contact.timestamp)}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground truncate mt-1">
                  {contact.lastMessage}
                </div>
                {contact.unread > 0 && (
                  <div className="mt-1 flex justify-end">
                    <div className="bg-crypto-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {contact.unread}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No contacts found
            </div>
          )}
        </div>
      </div>

      {/* Chat interface */}
      <div className={`flex-1 ${selectedContact ? 'block' : 'hidden md:block'}`}>
        {selectedContact ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="md:hidden mr-2"
                  onClick={() => setSelectedContact(null)}
                >
                  {direction === 'ltr' ? '←' : '→'}
                </Button>
                <div>
                  <h2 className="font-medium">{selectedContact.name}</h2>
                  <p className="text-xs text-muted-foreground truncate">
                    {selectedContact.address}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <ChatInterface 
              recipientAddress={selectedContact.address} 
              recipientName={selectedContact.name} 
            />
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-2xl font-semibold mb-2">{t('chats')}</h2>
            <p className="text-muted-foreground mb-4">
              Select a contact to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
