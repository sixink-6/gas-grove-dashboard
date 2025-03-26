
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ReportingDashboard from '@/components/reporting/ReportingDashboard';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from 'lucide-react';

// Sample client data for the dropdown
const clients = [
  { id: 'company-alpha', name: 'Company Alpha' },
  { id: 'acme-industries', name: 'Acme Industries' },
  { id: 'western-manufacturing', name: 'Western Manufacturing' },
];

const Reporting = () => {
  const isMobile = useIsMobile();
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gas-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'pl-0' : 'pl-64'}`}>
        <Header 
          title="Reports & Analytics" 
          subtitle="Generate detailed gas monitoring reports by client"
        />
        
        <main className="container mx-auto p-2 sm:p-4 animate-fade-in">
          <GlassMorphism intensity="light" className="p-3 sm:p-6 rounded-xl">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <h2 className="text-xl font-semibold">Client Reports</h2>
                    <div className="w-full sm:w-64">
                      <Select 
                        value={selectedClient || undefined} 
                        onValueChange={setSelectedClient}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map(client => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {selectedClient ? (
                <ReportingDashboard selectedClient={selectedClient} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                  <Users size={isMobile ? 48 : 64} className="text-gas-neutral-300 mb-4" />
                  <h3 className="text-xl font-medium text-gas-neutral-500 mb-2">Select a Client</h3>
                  <p className="text-gas-neutral-400 text-center max-w-md">
                    Choose a client from the dropdown above to view their detailed gas usage reports and analytics.
                  </p>
                </div>
              )}
            </div>
          </GlassMorphism>
        </main>
      </div>
    </div>
  );
};

export default Reporting;
