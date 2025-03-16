
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MonitoringDashboard from '@/components/monitoring/MonitoringDashboard';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gas-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 bg-gas-blue-500 rounded-xl flex items-center justify-center mb-6 animate-pulse-soft">
            <span className="text-2xl font-bold text-white">GM</span>
          </div>
          <h1 className="text-2xl font-semibold text-gas-neutral-900 dark:text-white animate-pulse-soft">
            Gas Monitoring Dashboard
          </h1>
          <p className="text-gas-neutral-500 mt-2 animate-pulse-soft">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gas-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'pl-0' : 'pl-64'}`}>
        <Header 
          title="Gas Out Dashboard" 
          subtitle="Track gas distribution and client usage"
        />
        
        <main className="container mx-auto p-2 sm:p-4 animate-fade-in">
          <GlassMorphism intensity="light" className="p-3 sm:p-6 rounded-xl">
            <MonitoringDashboard />
          </GlassMorphism>
        </main>
      </div>
    </div>
  );
};

export default Index;
