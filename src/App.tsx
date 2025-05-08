
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { WalletProvider } from "./context/WalletContext";
import AppLayout from './components/AppLayout';
import ChatsPage from './pages/ChatsPage';
import ContactsPage from './pages/ContactsPage';
import SettingsPage from './pages/SettingsPage';
import Onboarding from './components/Onboarding';

import "@/App.css";

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  // Check if onboarding has been completed
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed') === 'true';
    setShowOnboarding(!hasCompletedOnboarding);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <WalletProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
                <Routes>
                  <Route path="/" element={<AppLayout />}>
                    <Route index element={<Navigate to="/chats" />} />
                    <Route path="chats" element={<ChatsPage />} />
                    <Route path="contacts" element={<ContactsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </WalletProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
