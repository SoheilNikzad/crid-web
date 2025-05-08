
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, User, UserPlus, Copy, Check } from 'lucide-react';

interface Contact {
  address: string;
  name: string;
  notes?: string;
  publicKey?: string;
}

const ContactsPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const { isConnected } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [newContactAddress, setNewContactAddress] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  // Mock contacts
  const [contacts, setContacts] = useState<Contact[]>([
    {
      address: '0x1234567890123456789012345678901234567890',
      name: 'Alice',
      publicKey: '0x9876543210987654321098765432109876543210',
    },
    {
      address: '0x2345678901234567890123456789012345678901',
      name: 'Bob',
      publicKey: '0x8765432109876543210987654321098765432109',
    },
    {
      address: '0x3456789012345678901234567890123456789012',
      name: 'Charlie',
      publicKey: '0x7654321098765432109876543210987654321098',
    },
  ]);

  const handleAddContact = () => {
    if (!newContactAddress || !newContactName) return;
    
    // Add the new contact
    setContacts([
      ...contacts,
      {
        address: newContactAddress,
        name: newContactName,
      },
    ]);
    
    // Clear form and close dialog
    setNewContactAddress('');
    setNewContactName('');
    setDialogOpen(false);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopySuccess(address);
    setTimeout(() => setCopySuccess(null), 2000);
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
    <div className={`container mx-auto py-6 px-4 max-w-4xl animate-fade-in direction-${direction}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('contacts')}</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              {t('addContact')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('addContact')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="address">{t('enterAddress')}</Label>
                <Input
                  id="address"
                  value={newContactAddress}
                  onChange={(e) => setNewContactAddress(e.target.value)}
                  placeholder="0x..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">{t('contactName')}</Label>
                <Input
                  id="name"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddContact}>
                {t('addContact')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search contacts..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact.address}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-muted rounded-full p-2 mr-3">
                    <User size={24} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <div className="flex items-center">
                      <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                        {contact.address}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-6 w-6 p-0"
                        onClick={() => handleCopyAddress(contact.address)}
                      >
                        {copySuccess === contact.address ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-muted-foreground">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
