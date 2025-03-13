
import React from 'react';
import { Activity, AlertTriangle, BarChart, Droplets, Flame, Gauge, Thermometer } from 'lucide-react';
import GasMetricCard from './GasMetricCard';
import ChartComponent from './ChartComponent';

// Sample data for charts
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

const pressureData = [
  { name: '00:00', value: 1015 },
  { name: '03:00', value: 1014 },
  { name: '06:00', value: 1013 },
  { name: '09:00', value: 1012 },
  { name: '12:00', value: 1013 },
  { name: '15:00', value: 1014 },
  { name: '15:00', value: 1015 },
  { name: '21:00', value: 1016 },
];

const humidityData = [
  { name: '00:00', value: 35 },
  { name: '03:00', value: 36 },
  { name: '06:00', value: 38 },
  { name: '09:00', value: 34 },
  { name: '12:00', value: 30 },
  { name: '15:00', value: 32 },
  { name: '18:00', value: 34 },
  { name: '21:00', value: 35 },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GasMetricCard
          title="Gas Level"
          value={42}
          unit="ppm"
          icon={<Gauge size={40} />}
          trend="down"
          trendValue="2% from yesterday"
          status="normal"
          importance="primary"
          animationDelay={100}
        />
        <GasMetricCard
          title="Temperature"
          value={24.5}
          unit="°C"
          icon={<Thermometer size={40} />}
          trend="up"
          trendValue="0.8°C from yesterday"
          status="normal"
          importance="primary"
          animationDelay={200}
        />
        <GasMetricCard
          title="Pressure"
          value={1013}
          unit="hPa"
          icon={<Gauge size={40} />}
          trend="neutral"
          trendValue="Stable"
          status="normal"
          importance="primary"
          animationDelay={300}
        />
        <GasMetricCard
          title="Humidity"
          value={32}
          unit="%"
          icon={<Droplets size={40} />}
          trend="down"
          trendValue="3% from yesterday"
          status="normal"
          importance="primary"
          animationDelay={400}
        />
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartComponent
          type="area"
          data={pressureData}
          dataKey="value"
          strokeColor="#9CA3AF"
          fillColor="#F9FAFB"
          height={300}
          title="Pressure Trend"
          subtitle="Last 24 hours monitoring"
          className="animate-slide-up"
          style={{ animationDelay: '400ms' }}
          yAxisFormatter={(value) => `${value} hPa`}
        />
        <ChartComponent
          type="area"
          data={humidityData}
          dataKey="value"
          strokeColor="#66FFB6"
          fillColor="#F0FFF8"
          height={300}
          title="Humidity Trend"
          subtitle="Last 24 hours monitoring"
          className="animate-slide-up"
          style={{ animationDelay: '500ms' }}
          yAxisFormatter={(value) => `${value}%`}
        />
      </div>

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
          title="Energy Consumption"
          value={124}
          unit="kWh"
          icon={<Flame size={40} />}
          trend="up"
          trendValue="5% from last week"
          importance="secondary"
          animationDelay={800}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
