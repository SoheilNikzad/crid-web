
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage, languages, LanguageCode } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useWallet } from '@/context/WalletContext';
import { 
  MessageSquare, 
  User, 
  Settings, 
  Moon, 
  Sun, 
  Globe,
  Users
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';

const AppSidebar: React.FC = () => {
  const { t, setLanguageByCode, currentLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isConnected, shortAddress, connectWallet, disconnectWallet } = useWallet();
  const location = useLocation();

  const navItems = [
    { icon: <MessageSquare size={24} />, label: t('chats'), path: '/chats' },
    { icon: <Users size={24} />, label: t('contacts'), path: '/contacts' },
    { icon: <Settings size={24} />, label: t('settings'), path: '/settings' },
  ];

  return (
    <aside className="bg-sidebar fixed h-full w-16 md:w-64 flex flex-col justify-between py-6 overflow-hidden">
      {/* App Title */}
      <div className="px-4 mb-6">
        <h1 className="text-sidebar-foreground font-bold text-lg hidden md:block">
          {t('appName')}
        </h1>
        <div className="md:hidden flex justify-center">
          <div className="w-8 h-8 rounded-full bg-crypto-primary flex items-center justify-center text-white font-bold">
            CT
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center rounded-lg p-2 text-sidebar-foreground hover:bg-sidebar-accent group ${
                  location.pathname === item.path ? 'bg-sidebar-accent' : ''
                }`}
              >
                <div className="flex-shrink-0 text-sidebar-foreground">{item.icon}</div>
                <span className="ml-3 hidden md:block">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="px-2 space-y-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <div className="flex-shrink-0">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </div>
          <span className="ml-3 hidden md:block">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </Button>

        {/* Language selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Globe size={24} />
              <span className="ml-3 hidden md:block">{t('language')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(Object.keys(languages) as LanguageCode[]).map((langCode) => (
              <DropdownMenuItem 
                key={langCode} 
                onClick={() => setLanguageByCode(langCode)}
                className={`${currentLanguage.code === langCode ? 'font-bold' : ''} cursor-pointer`}
              >
                {languages[langCode].nativeName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Wallet connection */}
        <Button
          variant="ghost"
          onClick={isConnected ? disconnectWallet : connectWallet}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <User size={24} />
          <span className="ml-3 hidden md:block truncate">
            {isConnected ? shortAddress : t('connectWallet')}
          </span>
        </Button>
      </div>
    </aside>
  );
};

export default AppSidebar;
