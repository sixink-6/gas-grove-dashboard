
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ReportingDashboard from '@/components/reporting/ReportingDashboard';
import GlassMorphism from '@/components/ui/GlassMorphism';

const Reporting = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gas-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'pl-0' : 'pl-64'}`}>
        <Header 
          title="Reports & Analytics" 
          subtitle="Generate and export detailed gas monitoring reports"
        />
        
        <main className="container mx-auto p-2 sm:p-4 animate-fade-in">
          <GlassMorphism intensity="light" className="p-3 sm:p-6 rounded-xl">
            <ReportingDashboard />
          </GlassMorphism>
        </main>
      </div>
    </div>
  );
};

export default Reporting;
