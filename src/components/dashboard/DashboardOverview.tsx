
import React from 'react';
import { Activity, AlertTriangle, BarChart, Droplets, Flame, Gauge, Thermometer, Factory } from 'lucide-react';
import GasMetricCard from './GasMetricCard';
import ChartComponent from './ChartComponent';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MeterData {
  id: string;
  location: string;
  temperature: number;
  pressure: number;
  baseVolume: number;
  primaryVolume: number;
}

interface ClientData {
  id: string;
  name: string;
  location: string;
  meters: MeterData[];
}

interface DashboardOverviewProps {
  selectedClientData: ClientData;
}

// Sample data for overall charts
const gasLevelData = [
  { name: '00:00', value: 42 },
  { name: '03:00', value: 43 },
  { name: '06:00', value: 45 },
  { name: '09:00', value: 47 },
  { name: '12:00', value: 46 },
  { name: '15:00', value: 44 },
  { name: '18:00', value: 42 },
  { name: '21:00', value: 41 },
];

const temperatureData = [
  { name: '00:00', value: 22.1 },
  { name: '03:00', value: 21.8 },
  { name: '06:00', value: 21.9 },
  { name: '09:00', value: 23.4 },
  { name: '12:00', value: 24.5 },
  { name: '15:00', value: 24.2 },
  { name: '18:00', value: 23.1 },
  { name: '21:00', value: 22.5 },
];

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ selectedClientData }) => {
  // Calculate totals for all meters
  const totalBaseVolume = selectedClientData.meters.reduce((sum, meter) => sum + meter.baseVolume, 0);
  const totalPrimaryVolume = selectedClientData.meters.reduce((sum, meter) => sum + meter.primaryVolume, 0);
  const avgTemperature = selectedClientData.meters.reduce((sum, meter) => sum + meter.temperature, 0) / selectedClientData.meters.length;
  const avgPressure = selectedClientData.meters.reduce((sum, meter) => sum + meter.pressure, 0) / selectedClientData.meters.length;

  return (
    <div className="space-y-6">
      {/* Client Summary Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Overall Summary - {selectedClientData.name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <GasMetricCard
            title="Total Base Volume"
            value={totalBaseVolume.toFixed(1)}
            unit="m³"
            icon={<Gauge size={40} />}
            trend="up"
            trendValue="2.5% from yesterday"
            status="normal"
            importance="primary"
            animationDelay={100}
          />
          <GasMetricCard
            title="Total Primary Volume"
            value={totalPrimaryVolume.toFixed(1)}
            unit="m³"
            icon={<BarChart size={40} />}
            trend="up"
            trendValue="1.8% from yesterday"
            status="normal"
            importance="primary"
            animationDelay={200}
          />
          <GasMetricCard
            title="Average Temperature"
            value={avgTemperature.toFixed(1)}
            unit="°C"
            icon={<Thermometer size={40} />}
            trend="neutral"
            trendValue="Stable"
            status="normal"
            importance="primary"
            animationDelay={300}
          />
          <GasMetricCard
            title="Average Pressure"
            value={avgPressure.toFixed(1)}
            unit="Bar"
            icon={<Gauge size={40} />}
            trend="up"
            trendValue="0.2 Bar increase"
            status="normal"
            importance="primary"
            animationDelay={400}
          />
        </div>
      </div>

      {/* Individual Gas Meters */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Gas Meters ({selectedClientData.meters.length} meters)</h3>
        <div className="space-y-6">
          {selectedClientData.meters.map((meter, index) => (
            <Card key={meter.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Factory className="h-5 w-5 text-gas-blue-500" />
                  {meter.id} - {meter.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <GasMetricCard
                    title="Temperature"
                    value={meter.temperature}
                    unit="°C"
                    icon={<Thermometer size={32} />}
                    status="normal"
                    importance="secondary"
                    animationDelay={100 + (index * 50)}
                  />
                  <GasMetricCard
                    title="Pressure"
                    value={meter.pressure}
                    unit="Bar"
                    icon={<Gauge size={32} />}
                    status="normal"
                    importance="secondary"
                    animationDelay={150 + (index * 50)}
                  />
                  <GasMetricCard
                    title="Base Volume"
                    value={meter.baseVolume.toFixed(1)}
                    unit="m³"
                    icon={<BarChart size={32} />}
                    status="normal"
                    importance="secondary"
                    animationDelay={200 + (index * 50)}
                  />
                  <GasMetricCard
                    title="Primary Volume"
                    value={meter.primaryVolume.toFixed(1)}
                    unit="m³"
                    icon={<Activity size={32} />}
                    status="normal"
                    importance="secondary"
                    animationDelay={250 + (index * 50)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartComponent
          type="area"
          data={gasLevelData}
          dataKey="value"
          strokeColor="#00B9FF"
          fillColor="#E6F8FF"
          height={300}
          title="Gas Level Trend"
          subtitle="Last 24 hours monitoring"
          className="animate-slide-up"
          style={{ animationDelay: '200ms' }}
          yAxisFormatter={(value) => `${value} ppm`}
        />
        <ChartComponent
          type="line"
          data={temperatureData}
          dataKey="value"
          strokeColor="#FF6666"
          fillColor="#FFF0F0"
          height={300}
          title="Temperature Trend"
          subtitle="Last 24 hours monitoring"
          className="animate-slide-up"
          style={{ animationDelay: '300ms' }}
          yAxisFormatter={(value) => `${value}°C`}
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GasMetricCard
          title="Alert Count"
          value={0}
          icon={<AlertTriangle size={40} />}
          subtitle="No alerts in the last 24h"
          status="normal"
          importance="secondary"
          animationDelay={600}
        />
        <GasMetricCard
          title="System Status"
          value="Operational"
          icon={<Activity size={40} />}
          subtitle="All systems running normally"
          status="normal"
          importance="secondary"
          animationDelay={700}
        />
        <GasMetricCard
          title="Active Meters"
          value={selectedClientData.meters.length}
          icon={<Factory size={40} />}
          subtitle={`${selectedClientData.meters.length} meters online`}
          status="normal"
          importance="secondary"
          animationDelay={800}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
