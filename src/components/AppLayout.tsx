
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { useLanguage } from '@/context/LanguageContext';

const AppLayout: React.FC = () => {
  const { direction } = useLanguage();
  
  return (
    <div className={`flex min-h-screen bg-background direction-${direction}`}>
      <AppSidebar />
      <div className="flex-1 ml-16 md:ml-64">
        <main className="h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
