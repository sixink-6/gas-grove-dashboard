
import React, { useState } from 'react';
import { MapPin, Thermometer, Gauge, CreditCard, AlertTriangle, BarChart, ChevronDown, ChevronUp, Factory } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import GasMetricCard from '../dashboard/GasMetricCard';
import ChartComponent from '../dashboard/ChartComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MeterData {
  id: string;
  location: string;
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
}

interface ClientData {
  id: string;
  name: string;
  location: string;
  meters: MeterData[];
  totalConsumption: {
    daily: number;
    weekly: number;
    monthly: number;
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
  const [selectedMeter, setSelectedMeter] = useState<string>(client.meters[0]?.id || '');
  
  // Default billing period if not provided
  const billingPeriod = client.billingPeriod || {
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date() // Today
  };
  
  const formattedBillingPeriod = `${format(billingPeriod.from, 'd MMM')} - ${format(billingPeriod.to, 'd MMM yyyy')}`;
  
  const currentMeter = client.meters.find(meter => meter.id === selectedMeter) || client.meters[0];
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Client header and meter selection */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">{client.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 text-xs sm:text-sm">
            <MapPin size={isMobile ? 14 : 16} className="text-gas-neutral-500" />
            {client.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
              <div>
                <span className="text-xs text-gas-neutral-500">Meters</span>
                <p className="font-medium text-xs sm:text-sm">{client.meters.length} active meters</p>
              </div>
              <div>
                <span className="text-xs text-gas-neutral-500">Alerts</span>
                <p className={`font-medium text-xs sm:text-sm ${client.alerts > 0 ? 'text-gas-red-500' : 'text-gas-green-500'}`}>
                  {client.alerts > 0 ? `${client.alerts} active` : 'None'}
                </p>
              </div>
            </div>
            
            {client.meters.length > 1 && (
              <div>
                <label className="text-xs text-gas-neutral-500 mb-1 block">Select Gas Meter</label>
                <Tabs 
                  value={selectedMeter} 
                  onValueChange={setSelectedMeter}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 sm:grid-cols-3 w-full">
                    {client.meters.map(meter => (
                      <TabsTrigger key={meter.id} value={meter.id} className="text-xs">
                        <Factory className="mr-1 h-3 w-3" />
                        {meter.id} ({meter.location})
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Consumption and metrics with collapsible charts for the selected meter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <GasMetricCard
          title="Gas Consumption"
          value={currentMeter.consumption[timeRange]}
          unit="m³"
          icon={<BarChart size={isMobile ? 32 : 40} />}
          subtitle={`${timeRange} usage - ${currentMeter.location}`}
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
            value={currentMeter.temperature.current}
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
              data={currentMeter.temperature.history}
              dataKey="value"
              strokeColor="#FF6666"
              fillColor="#FFF0F0"
              height={isMobile ? 180 : 220}
              title={`Temperature - ${currentMeter.id}`}
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
            value={currentMeter.pressure.current}
            unit="Barg"
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
              data={currentMeter.pressure.history}
              dataKey="value"
              strokeColor="#9CA3AF"
              fillColor="#F9FAFB"
              height={isMobile ? 180 : 220}
              title={`Pressure - ${currentMeter.id}`}
              subtitle="24-hour trend"
              yAxisFormatter={(value) => `${value} Barg`}
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
