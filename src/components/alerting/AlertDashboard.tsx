
import React, { useState } from 'react';
import AlertStatCards from './AlertStatCards';
import AlertsTable from './AlertsTable';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const AlertDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gas-neutral-900 dark:text-white">
            Alert Management
          </h2>
          <p className="text-gas-neutral-500 mt-1">
            Monitor and respond to system alerts across all clients
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          variant="outline"
          className="text-gas-neutral-600 dark:text-gas-neutral-300"
          disabled={isRefreshing}
        >
          <RefreshCw 
            className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
          />
          Refresh
        </Button>
      </div>

      <AlertStatCards />
      <AlertsTable />
    </div>
  );
};

export default AlertDashboard;
