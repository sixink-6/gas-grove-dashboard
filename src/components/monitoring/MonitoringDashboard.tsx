
import React, { useState } from 'react';
import { 
  Gauge, 
  Truck, 
  AlertTriangle, 
  Users, 
  MapPin, 
  Thermometer, 
  CreditCard,
  Activity,
  BarChart,
  Filter
} from 'lucide-react';
import GasMetricCard from '../dashboard/GasMetricCard';
import ChartComponent from '../dashboard/ChartComponent';
import ClientOverview from './ClientOverview';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const overallData = {
  tankBalance: 7850,
  totalGasDelivered: 12450,
  alertCount: 2,
};

const clientsData = [
  {
    id: 'client-001',
    name: 'Company Alpha',
    location: '123 Industrial Park, New York',
    meterId: 'GM-NY-001',
    consumption: {
      daily: 125,
      weekly: 875,
      monthly: 3750
    },
    temperature: {
      current: 24.2,
      history: [
        { name: '00:00', value: 23.1 },
        { name: '04:00', value: 22.8 },
        { name: '08:00', value: 23.5 },
        { name: '12:00', value: 24.7 },
        { name: '16:00', value: 24.2 },
        { name: '20:00', value: 23.8 }
      ]
    },
    pressure: {
      current: 1015,
      history: [
        { name: '00:00', value: 1014 },
        { name: '04:00', value: 1014 },
        { name: '08:00', value: 1015 },
        { name: '12:00', value: 1016 },
        { name: '16:00', value: 1015 },
        { name: '20:00', value: 1015 }
      ]
    },
    billing: 3750,
    alerts: 1
  },
  {
    id: 'client-002',
    name: 'Acme Industries',
    location: '456 Business Zone, Chicago',
    meterId: 'GM-CHI-002',
    consumption: {
      daily: 87,
      weekly: 609,
      monthly: 2610
    },
    temperature: {
      current: 23.1,
      history: [
        { name: '00:00', value: 22.7 },
        { name: '04:00', value: 22.5 },
        { name: '08:00', value: 23.1 },
        { name: '12:00', value: 23.6 },
        { name: '16:00', value: 23.1 },
        { name: '20:00', value: 22.9 }
      ]
    },
    pressure: {
      current: 1013,
      history: [
        { name: '00:00', value: 1012 },
        { name: '04:00', value: 1012 },
        { name: '08:00', value: 1013 },
        { name: '12:00', value: 1014 },
        { name: '16:00', value: 1013 },
        { name: '20:00', value: 1013 }
      ]
    },
    billing: 2610,
    alerts: 0
  },
  {
    id: 'client-003',
    name: 'Western Manufacturing',
    location: '789 Factory Road, Los Angeles',
    meterId: 'GM-LA-003',
    consumption: {
      daily: 145,
      weekly: 1015,
      monthly: 4350
    },
    temperature: {
      current: 25.6,
      history: [
        { name: '00:00', value: 24.3 },
        { name: '04:00', value: 24.1 },
        { name: '08:00', value: 24.8 },
        { name: '12:00', value: 25.9 },
        { name: '16:00', value: 25.6 },
        { name: '20:00', value: 25.0 }
      ]
    },
    pressure: {
      current: 1011,
      history: [
        { name: '00:00', value: 1010 },
        { name: '04:00', value: 1010 },
        { name: '08:00', value: 1011 },
        { name: '12:00', value: 1012 },
        { name: '16:00', value: 1011 },
        { name: '20:00', value: 1011 }
      ]
    },
    billing: 4350,
    alerts: 1
  }
];

const MonitoringDashboard = () => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const clientData = selectedClient 
    ? clientsData.find(client => client.id === selectedClient) 
    : null;

  return (
    <div className="space-y-8">
      {/* Overall Information Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Overall Gas Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GasMetricCard
            title="Gas Tank Balance"
            value={overallData.tankBalance}
            unit="m³"
            icon={<Gauge size={40} />}
            trend="down"
            trendValue="2.5% from yesterday"
            status="normal"
            importance="primary"
            animationDelay={100}
          />
          <GasMetricCard
            title="Total Gas Delivered"
            value={overallData.totalGasDelivered}
            unit="m³"
            icon={<Truck size={40} />}
            trend="up"
            trendValue="15% this month"
            status="normal"
            importance="primary"
            animationDelay={200}
          />
          <GasMetricCard
            title="Alert Count"
            value={overallData.alertCount}
            icon={<AlertTriangle size={40} />}
            trend="up"
            trendValue="1 new today"
            status={overallData.alertCount > 0 ? "warning" : "normal"}
            importance="primary"
            animationDelay={300}
          />
        </div>
      </div>

      {/* Client Selection Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-gas-neutral-200 dark:border-gas-neutral-700">
        <h2 className="text-xl font-semibold">Client Gas Usage</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-64">
            <Select onValueChange={(value) => setSelectedClient(value)} value={selectedClient || undefined}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clientsData.map(client => (
                  <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setTimeRange('daily')} 
              className={`px-3 py-1 rounded-md text-sm ${timeRange === 'daily' 
                ? 'bg-gas-blue-100 text-gas-blue-700 dark:bg-gas-blue-900/30 dark:text-gas-blue-400' 
                : 'text-gas-neutral-700 hover:bg-gas-blue-50 dark:text-gas-neutral-300 dark:hover:bg-gas-blue-900/20'}`}
            >
              Daily
            </button>
            <button 
              onClick={() => setTimeRange('weekly')} 
              className={`px-3 py-1 rounded-md text-sm ${timeRange === 'weekly' 
                ? 'bg-gas-blue-100 text-gas-blue-700 dark:bg-gas-blue-900/30 dark:text-gas-blue-400' 
                : 'text-gas-neutral-700 hover:bg-gas-blue-50 dark:text-gas-neutral-300 dark:hover:bg-gas-blue-900/20'}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setTimeRange('monthly')} 
              className={`px-3 py-1 rounded-md text-sm ${timeRange === 'monthly' 
                ? 'bg-gas-blue-100 text-gas-blue-700 dark:bg-gas-blue-900/30 dark:text-gas-blue-400' 
                : 'text-gas-neutral-700 hover:bg-gas-blue-50 dark:text-gas-neutral-300 dark:hover:bg-gas-blue-900/20'}`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Client Data or Selection Prompt */}
      {selectedClient ? (
        <ClientOverview client={clientData!} timeRange={timeRange} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Users size={64} className="text-gas-neutral-300 mb-4" />
          <h3 className="text-xl font-medium text-gas-neutral-500 mb-2">Select a Client</h3>
          <p className="text-gas-neutral-400 text-center max-w-md">
            Choose a client from the dropdown above to view their gas usage data, monitoring information, and billing details.
          </p>
        </div>
      )}
    </div>
  );
};

export default MonitoringDashboard;
