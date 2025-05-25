
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useIsMobile } from '@/hooks/use-mobile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample clients data with multiple gas meters
const clientsData = [
  {
    id: 'client-001',
    name: 'Company Alpha',
    location: '123 Industrial Park, New York',
    meters: [
      {
        id: 'GM-NY-001',
        location: 'Main Building',
        temperature: 24.2,
        pressure: 5.2,
        baseVolume: 1250.5,
        primaryVolume: 1180.3
      },
      {
        id: 'GM-NY-002',
        location: 'Warehouse',
        temperature: 23.8,
        pressure: 4.9,
        baseVolume: 850.2,
        primaryVolume: 820.1
      }
    ]
  },
  {
    id: 'client-002',
    name: 'Acme Industries',
    location: '456 Business Zone, Chicago',
    meters: [
      {
        id: 'GM-CHI-002',
        location: 'Production Plant',
        temperature: 23.1,
        pressure: 4.8,
        baseVolume: 1850.7,
        primaryVolume: 1790.2
      }
    ]
  },
  {
    id: 'client-003',
    name: 'Western Manufacturing',
    location: '789 Factory Road, Los Angeles',
    meters: [
      {
        id: 'GM-LA-003A',
        location: 'Building A',
        temperature: 25.2,
        pressure: 5.3,
        baseVolume: 2100.8,
        primaryVolume: 2050.4
      },
      {
        id: 'GM-LA-003B',
        location: 'Building B',
        temperature: 26.0,
        pressure: 5.5,
        baseVolume: 1650.3,
        primaryVolume: 1620.9
      }
    ]
  }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<string>(clientsData[0].id);
  const isMobile = useIsMobile();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const selectedClientData = clientsData.find(client => client.id === selectedClient) || clientsData[0];

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
          title="Gas Monitoring Dashboard" 
          subtitle="Monitor gas meters and track consumption"
        />
        
        <main className="container mx-auto p-2 sm:p-4 animate-fade-in">
          <GlassMorphism intensity="light" className="p-3 sm:p-6 rounded-xl">
            {/* Client Filter */}
            <div className="mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Client Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gas-neutral-700 dark:text-gas-neutral-300 mb-2 block">
                        Select Client
                      </label>
                      <Select value={selectedClient} onValueChange={setSelectedClient}>
                        <SelectTrigger className="w-full max-w-md">
                          <SelectValue placeholder="Choose a client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientsData.map(client => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name} - {client.location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-sm text-gas-neutral-500">
                      Viewing dashboard for: <span className="font-medium text-gas-neutral-700 dark:text-gas-neutral-300">{selectedClientData.name}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <DashboardOverview selectedClientData={selectedClientData} />
          </GlassMorphism>
        </main>
      </div>
    </div>
  );
};

export default Index;
