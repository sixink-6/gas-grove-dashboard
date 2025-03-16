
import React, { useState } from 'react';
import { MapPin, Thermometer, Gauge, CreditCard, AlertTriangle, BarChart, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import GasMetricCard from '../dashboard/GasMetricCard';
import ChartComponent from '../dashboard/ChartComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

interface ClientData {
  id: string;
  name: string;
  location: string;
  meterId: string;
  consumption: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  temperature: {
    current: number;
    history: Array<{ name: string; value: number }>;
  };
  pressure: {
    current: number;
    history: Array<{ name: string; value: number }>;
  };
  billing: number;
  billingPeriod?: {
    from: Date;
    to: Date;
  };
  alerts: number;
}

interface ClientOverviewProps {
  client: ClientData;
  timeRange: 'daily' | 'weekly' | 'monthly';
}

const ClientOverview: React.FC<ClientOverviewProps> = ({ client, timeRange }) => {
  const isMobile = useIsMobile();
  const [tempChartOpen, setTempChartOpen] = useState(false);
  const [pressureChartOpen, setPressureChartOpen] = useState(false);
  
  // Default billing period if not provided
  const billingPeriod = client.billingPeriod || {
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date() // Today
  };
  
  const formattedBillingPeriod = `${format(billingPeriod.from, 'd MMM')} - ${format(billingPeriod.to, 'd MMM yyyy')}`;
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Client header and meter info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">{client.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-xs sm:text-sm">
            <MapPin size={isMobile ? 14 : 16} className="text-gas-neutral-500" />
            {client.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <span className="text-xs text-gas-neutral-500">Meter ID</span>
              <p className="font-mono text-xs sm:text-sm">{client.meterId}</p>
            </div>
            <div>
              <span className="text-xs text-gas-neutral-500">Alerts</span>
              <p className={`font-medium text-xs sm:text-sm ${client.alerts > 0 ? 'text-gas-red-500' : 'text-gas-green-500'}`}>
                {client.alerts > 0 ? `${client.alerts} active` : 'None'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consumption and metrics with collapsible charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <GasMetricCard
          title="Gas Out"
          value={client.consumption[timeRange]}
          unit="m³"
          icon={<BarChart size={isMobile ? 32 : 40} />}
          subtitle={`${timeRange} usage`}
          status="normal"
          importance="primary"
          animationDelay={100}
        />
        
        {/* Temperature with collapsible chart */}
        <Collapsible 
          open={tempChartOpen} 
          onOpenChange={setTempChartOpen} 
          className="col-span-1"
        >
          <GasMetricCard
            title="Gas Temperature"
            value={client.temperature.current}
            unit="°C"
            icon={<Thermometer size={isMobile ? 32 : 40} />}
            trend="neutral"
            trendValue="Stable"
            status="normal"
            importance="primary"
            animationDelay={200}
            className="mb-0"
            suffix={
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 h-7 ml-auto">
                  {tempChartOpen ? (
                    <>
                      <span className="text-xs">Collapse</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="text-xs">Expand</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            }
          />
          
          <CollapsibleContent className="mt-3">
            <ChartComponent
              type="line"
              data={client.temperature.history}
              dataKey="value"
              strokeColor="#FF6666"
              fillColor="#FFF0F0"
              height={isMobile ? 180 : 220}
              title="Temperature Monitoring"
              subtitle="24-hour trend"
              yAxisFormatter={(value) => `${value}°C`}
              showAnimations={true}
            />
          </CollapsibleContent>
        </Collapsible>
        
        {/* Pressure with collapsible chart */}
        <Collapsible 
          open={pressureChartOpen} 
          onOpenChange={setPressureChartOpen}
          className="col-span-1"
        >
          <GasMetricCard
            title="Gas Pressure"
            value={client.pressure.current}
            unit="hPa"
            icon={<Gauge size={isMobile ? 32 : 40} />}
            trend="neutral"
            trendValue="Normal range"
            status="normal"
            importance="primary"
            animationDelay={300}
            className="mb-0"
            suffix={
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 h-7 ml-auto">
                  {pressureChartOpen ? (
                    <>
                      <span className="text-xs">Collapse</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="text-xs">Expand</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            }
          />
          
          <CollapsibleContent className="mt-3">
            <ChartComponent
              type="line"
              data={client.pressure.history}
              dataKey="value"
              strokeColor="#9CA3AF"
              fillColor="#F9FAFB"
              height={isMobile ? 180 : 220}
              title="Pressure Monitoring"
              subtitle="24-hour trend"
              yAxisFormatter={(value) => `${value} hPa`}
              showAnimations={true}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Billing and Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <GasMetricCard
          title="Current Billing"
          value={`$${client.billing.toLocaleString()}`}
          icon={<CreditCard size={isMobile ? 32 : 40} />}
          subtitle={`Total from ${formattedBillingPeriod}`}
          importance="secondary"
          animationDelay={400}
        />
        <GasMetricCard
          title="Anomaly Alerts"
          value={client.alerts}
          icon={<AlertTriangle size={isMobile ? 32 : 40} />}
          subtitle={client.alerts > 0 ? "Attention required" : "System normal"}
          status={client.alerts > 0 ? "warning" : "normal"}
          importance="secondary"
          animationDelay={500}
        />
      </div>
    </div>
  );
};

export default ClientOverview;
