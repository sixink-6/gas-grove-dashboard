
import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data - in a real app, this would come from an API
const generateData = (from: Date, to: Date) => {
  const data = [];
  const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  const startDate = new Date(from);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      'Company Alpha': Math.floor(Math.random() * (150 - 100) + 100),
      'Acme Industries': Math.floor(Math.random() * (120 - 70) + 70),
      'Western Manufacturing': Math.floor(Math.random() * (180 - 130) + 130),
    });
  }
  
  return data;
};

interface ConsumptionTrendsChartProps {
  chartType: 'line' | 'bar' | 'pie';
  dateRange: {
    from: Date;
    to: Date;
  };
  selectedClient?: string;
}

const ConsumptionTrendsChart = ({ chartType, dateRange, selectedClient = 'all' }: ConsumptionTrendsChartProps) => {
  const data = generateData(dateRange.from, dateRange.to);
  
  // Function to determine which lines/bars to display based on selectedClient
  const shouldShowClient = (clientName: string) => {
    if (selectedClient === 'all') return true;
    if (selectedClient === 'company-alpha' && clientName === 'Company Alpha') return true;
    if (selectedClient === 'acme-industries' && clientName === 'Acme Industries') return true;
    if (selectedClient === 'western-manufacturing' && clientName === 'Western Manufacturing') return true;
    return false;
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Daily Consumption Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            {chartType === 'line' ? (
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis unit=" m³" />
                <Tooltip />
                <Legend />
                {shouldShowClient('Company Alpha') && (
                  <Line 
                    type="monotone" 
                    dataKey="Company Alpha" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                )}
                {shouldShowClient('Acme Industries') && (
                  <Line 
                    type="monotone" 
                    dataKey="Acme Industries" 
                    stroke="#82ca9d" 
                  />
                )}
                {shouldShowClient('Western Manufacturing') && (
                  <Line 
                    type="monotone" 
                    dataKey="Western Manufacturing" 
                    stroke="#ffc658" 
                  />
                )}
              </LineChart>
            ) : (
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis unit=" m³" />
                <Tooltip />
                <Legend />
                {shouldShowClient('Company Alpha') && (
                  <Bar dataKey="Company Alpha" fill="#8884d8" />
                )}
                {shouldShowClient('Acme Industries') && (
                  <Bar dataKey="Acme Industries" fill="#82ca9d" />
                )}
                {shouldShowClient('Western Manufacturing') && (
                  <Bar dataKey="Western Manufacturing" fill="#ffc658" />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsumptionTrendsChart;
