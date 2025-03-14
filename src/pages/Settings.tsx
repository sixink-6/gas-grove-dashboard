
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gas-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'pl-0' : 'pl-64'}`}>
        <Header 
          title="Settings" 
          subtitle="Configure system settings and user access"
        />
        
        <main className="container mx-auto p-2 sm:p-4 animate-fade-in">
          <GlassMorphism intensity="light" className="p-3 sm:p-6 rounded-xl">
            <Tabs defaultValue={currentPath.includes('user-management') ? 'user-management' : 'role-management'} className="mb-6">
              <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger value="role-management" asChild>
                  <Link to="/settings/role-management" className="w-full">Role Management</Link>
                </TabsTrigger>
                <TabsTrigger value="user-management" asChild>
                  <Link to="/settings/user-management" className="w-full">User Management</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Outlet />
          </GlassMorphism>
        </main>
      </div>
    </div>
  );
};

export default Settings;
