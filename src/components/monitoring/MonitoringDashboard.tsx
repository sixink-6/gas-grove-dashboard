
import React, { useState } from 'react';
import { 
  Gauge, 
  Truck, 
  AlertTriangle, 
  Users, 
  MapPin, 
  ArrowRight, 
  BarChart, 
  Activity
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import GasMetricCard from '../dashboard/GasMetricCard';
import ClientOverview from './ClientOverview';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

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
    meters: [
      {
        id: 'GM-NY-001',
        location: 'Main Building',
        consumption: {
          daily: 85,
          weekly: 595,
          monthly: 2550
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
          current: 5.2,
          history: [
            { name: '00:00', value: 5.1 },
            { name: '04:00', value: 5.1 },
            { name: '08:00', value: 5.2 },
            { name: '12:00', value: 5.3 },
            { name: '16:00', value: 5.2 },
            { name: '20:00', value: 5.2 }
          ]
        }
      },
      {
        id: 'GM-NY-002',
        location: 'Warehouse',
        consumption: {
          daily: 40,
          weekly: 280,
          monthly: 1200
        },
        temperature: {
          current: 23.8,
          history: [
            { name: '00:00', value: 23.0 },
            { name: '04:00', value: 22.7 },
            { name: '08:00', value: 23.2 },
            { name: '12:00', value: 24.0 },
            { name: '16:00', value: 23.8 },
            { name: '20:00', value: 23.5 }
          ]
        },
        pressure: {
          current: 4.9,
          history: [
            { name: '00:00', value: 4.8 },
            { name: '04:00', value: 4.8 },
            { name: '08:00', value: 4.9 },
            { name: '12:00', value: 5.0 },
            { name: '16:00', value: 4.9 },
            { name: '20:00', value: 4.9 }
          ]
        }
      }
    ],
    totalConsumption: {
      daily: 125,
      weekly: 875,
      monthly: 3750
    },
    billing: 3750,
    alerts: 1
  },
  {
    id: 'client-002',
    name: 'Acme Industries',
    location: '456 Business Zone, Chicago',
    meters: [
      {
        id: 'GM-CHI-002',
        location: 'Production Plant',
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
          current: 4.8,
          history: [
            { name: '00:00', value: 4.7 },
            { name: '04:00', value: 4.7 },
            { name: '08:00', value: 4.8 },
            { name: '12:00', value: 4.9 },
            { name: '16:00', value: 4.8 },
            { name: '20:00', value: 4.8 }
          ]
        }
      }
    ],
    totalConsumption: {
      daily: 87,
      weekly: 609,
      monthly: 2610
    },
    billing: 2610,
    alerts: 0
  },
  {
    id: 'client-003',
    name: 'Western Manufacturing',
    location: '789 Factory Road, Los Angeles',
    meters: [
      {
        id: 'GM-LA-003A',
        location: 'Building A',
        consumption: {
          daily: 85,
          weekly: 595,
          monthly: 2550
        },
        temperature: {
          current: 25.2,
          history: [
            { name: '00:00', value: 24.1 },
            { name: '04:00', value: 24.0 },
            { name: '08:00', value: 24.5 },
            { name: '12:00', value: 25.5 },
            { name: '16:00', value: 25.2 },
            { name: '20:00', value: 24.8 }
          ]
        },
        pressure: {
          current: 5.3,
          history: [
            { name: '00:00', value: 5.2 },
            { name: '04:00', value: 5.2 },
            { name: '08:00', value: 5.3 },
            { name: '12:00', value: 5.4 },
            { name: '16:00', value: 5.3 },
            { name: '20:00', value: 5.3 }
          ]
        }
      },
      {
        id: 'GM-LA-003B',
        location: 'Building B',
        consumption: {
          daily: 60,
          weekly: 420,
          monthly: 1800
        },
        temperature: {
          current: 26.0,
          history: [
            { name: '00:00', value: 24.5 },
            { name: '04:00', value: 24.2 },
            { name: '08:00', value: 25.1 },
            { name: '12:00', value: 26.3 },
            { name: '16:00', value: 26.0 },
            { name: '20:00', value: 25.2 }
          ]
        },
        pressure: {
          current: 5.5,
          history: [
            { name: '00:00', value: 5.4 },
            { name: '04:00', value: 5.4 },
            { name: '08:00', value: 5.5 },
            { name: '12:00', value: 5.6 },
            { name: '16:00', value: 5.5 },
            { name: '20:00', value: 5.5 }
          ]
        }
      }
    ],
    totalConsumption: {
      daily: 145,
      weekly: 1015,
      monthly: 4350
    },
    billing: 4350,
    alerts: 1
  }
];

const MonitoringDashboard = () => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const isMobile = useIsMobile();
  
  const clientData = selectedClient 
    ? clientsData.find(client => client.id === selectedClient) 
    : null;

  return (
    <div className="space-y-6">
      {/* Overall Information Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Overall Gas Distribution</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <GasMetricCard
            title="Gas Tank Balance"
            value={overallData.tankBalance}
            unit="m³"
            icon={<Gauge size={isMobile ? 32 : 40} />}
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
            icon={<Truck size={isMobile ? 32 : 40} />}
            trend="up"
            trendValue="15% this month"
            status="normal"
            importance="primary"
            animationDelay={200}
          />
          <GasMetricCard
            title="Alert Count"
            value={overallData.alertCount}
            icon={<AlertTriangle size={isMobile ? 32 : 40} />}
            trend="up"
            trendValue="1 new today"
            status={overallData.alertCount > 0 ? "warning" : "normal"}
            importance="primary"
            animationDelay={300}
          />
        </div>
      </div>

      {/* All Clients Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Client Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientsData.map((client) => (
            <Card key={client.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{client.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-xs sm:text-sm">
                  <MapPin size={isMobile ? 14 : 16} className="text-gas-neutral-500" />
                  {client.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Consumption:</span>
                    <span className="font-medium">{client.totalConsumption.monthly} m³/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gas Meters:</span>
                    <span className="font-medium">{client.meters.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Alerts:</span>
                    <span className={`font-medium ${client.alerts > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {client.alerts > 0 ? `${client.alerts} active` : 'None'}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setSelectedClient(client.id)}
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected Client Details */}
      {selectedClient && (
        <div className="space-y-4 pt-2 border-t border-gas-neutral-200 dark:border-gas-neutral-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-xl font-semibold">{clientData?.name} Details</h2>
              <p className="text-muted-foreground text-sm">{clientData?.location}</p>
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
          
          <ClientOverview client={clientData!} timeRange={timeRange} />
          
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setSelectedClient(null)}>
              Back to All Clients
            </Button>
            <Link to="/reporting">
              <Button variant="default" size="sm" className="ml-2">
                View Reports
                <BarChart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringDashboard;
