
import React, { useState } from 'react';
import { useLanguage, languages, LanguageCode } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Moon, 
  Sun, 
  Languages, 
  Key, 
  Copy, 
  Check, 
  Save 
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { t, setLanguageByCode, currentLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isConnected, address, generateKeyPair } = useWallet();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [keys, setKeys] = useState({
    publicKey: '0x9876543210987654321098765432109876543210',
    privateKey: '0x1234567890123456789012345678901234567890',
  });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const regenerateKeys = async () => {
    const newKeys = await generateKeyPair();
    setKeys(newKeys);
  };

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
    <div className="container mx-auto py-6 px-4 max-w-4xl animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">{t('settings')}</h1>
      
      <div className="grid gap-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                <Label htmlFor="dark-mode">{t('darkMode')}</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle>{t('language')}</CardTitle>
            <CardDescription>Choose your preferred language</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Languages size={20} />
              <Select
                value={currentLanguage.code}
                onValueChange={(value: LanguageCode) => setLanguageByCode(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(languages) as LanguageCode[]).map((langCode) => (
                    <SelectItem key={langCode} value={langCode}>
                      {languages[langCode].nativeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Encryption Keys */}
        <Card>
          <CardHeader>
            <CardTitle>{t('encryption')}</CardTitle>
            <CardDescription>Manage your encryption keys</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>{t('publicKey')}</Label>
              <div className="flex space-x-2">
                <div className="p-2 bg-muted rounded font-mono text-sm truncate flex-1">
                  {keys.publicKey}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(keys.publicKey, 'public')}
                >
                  {copySuccess === 'public' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('privateKey')}</Label>
              <div className="flex space-x-2">
                <div className="p-2 bg-muted rounded font-mono text-sm truncate blur-[3px] hover:blur-none transition-all flex-1">
                  {keys.privateKey}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(keys.privateKey, 'private')}
                >
                  {copySuccess === 'private' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Never share your private key with anyone
              </p>
            </div>

            <div className="pt-2 flex space-x-2">
              <Button
                variant="outline"
                onClick={regenerateKeys}
                className="flex items-center"
              >
                <Key className="mr-2 h-4 w-4" />
                Regenerate Keys
              </Button>
              <Button className="flex items-center">
                <Save className="mr-2 h-4 w-4" />
                {t('backupKeys')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
