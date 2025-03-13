
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import GlassMorphism from '@/components/ui/GlassMorphism';
import MonitoringDashboard from '@/components/monitoring/MonitoringDashboard';

const Monitoring = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gas-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      <div className="transition-all duration-300 ease-in-out pl-64">
        <Header 
          title="Gas Monitoring System" 
          subtitle="Track gas distribution and client usage"
        />
        
        <main className="container mx-auto p-4 animate-fade-in">
          <GlassMorphism intensity="light" className="p-6 rounded-xl">
            <MonitoringDashboard />
          </GlassMorphism>
        </main>
      </div>
    </div>
  );
};

export default Monitoring;
