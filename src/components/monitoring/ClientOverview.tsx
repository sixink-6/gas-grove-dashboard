
import React from 'react';
import { MapPin, Thermometer, Gauge, CreditCard, AlertTriangle, BarChart } from 'lucide-react';
import GasMetricCard from '../dashboard/GasMetricCard';
import ChartComponent from '../dashboard/ChartComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  alerts: number;
}

interface ClientOverviewProps {
  client: ClientData;
  timeRange: 'daily' | 'weekly' | 'monthly';
}

const ClientOverview: React.FC<ClientOverviewProps> = ({ client, timeRange }) => {
  return (
    <div className="space-y-6">
      {/* Client header and meter info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{client.name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <MapPin size={16} className="text-gas-neutral-500" />
            {client.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <span className="text-xs text-gas-neutral-500">Meter ID</span>
              <p className="font-mono text-sm">{client.meterId}</p>
            </div>
            <div>
              <span className="text-xs text-gas-neutral-500">Alerts</span>
              <p className={`font-medium ${client.alerts > 0 ? 'text-gas-red-500' : 'text-gas-green-500'}`}>
                {client.alerts > 0 ? `${client.alerts} active` : 'None'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consumption and Billing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GasMetricCard
          title="Gas Consumption"
          value={client.consumption[timeRange]}
          unit="m³"
          icon={<BarChart size={40} />}
          subtitle={`${timeRange} usage`}
          status="normal"
          importance="primary"
          animationDelay={100}
        />
        <GasMetricCard
          title="Gas Temperature"
          value={client.temperature.current}
          unit="°C"
          icon={<Thermometer size={40} />}
          trend="neutral"
          trendValue="Stable"
          status="normal"
          importance="primary"
          animationDelay={200}
        />
        <GasMetricCard
          title="Gas Pressure"
          value={client.pressure.current}
          unit="hPa"
          icon={<Gauge size={40} />}
          trend="neutral"
          trendValue="Normal range"
          status="normal"
          importance="primary"
          animationDelay={300}
        />
      </div>

      {/* Charts for Temperature and Pressure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartComponent
          type="line"
          data={client.temperature.history}
          dataKey="value"
          strokeColor="#FF6666"
          fillColor="#FFF0F0"
          height={250}
          title="Temperature Monitoring"
          subtitle="24-hour trend"
          yAxisFormatter={(value) => `${value}°C`}
          showAnimations={true}
        />
        <ChartComponent
          type="line"
          data={client.pressure.history}
          dataKey="value"
          strokeColor="#9CA3AF"
          fillColor="#F9FAFB"
          height={250}
          title="Pressure Monitoring"
          subtitle="24-hour trend"
          yAxisFormatter={(value) => `${value} hPa`}
          showAnimations={true}
        />
      </div>

      {/* Billing and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GasMetricCard
          title="Current Billing"
          value={`$${client.billing.toLocaleString()}`}
          icon={<CreditCard size={40} />}
          subtitle={`Based on ${timeRange} consumption`}
          importance="secondary"
          animationDelay={400}
        />
        <GasMetricCard
          title="Anomaly Alerts"
          value={client.alerts}
          icon={<AlertTriangle size={40} />}
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
