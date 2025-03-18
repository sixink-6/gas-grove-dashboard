
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data - in a real app, this would come from an API
const allClientsData = [
  { name: 'Company Alpha', value: 3750 },
  { name: 'Acme Industries', value: 2610 },
  { name: 'Western Manufacturing', value: 4350 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

interface ClientDistributionChartProps {
  chartType: 'line' | 'bar' | 'pie';
  selectedClient?: string;
}

const ClientDistributionChart = ({ chartType, selectedClient = 'all' }: ClientDistributionChartProps) => {
  // Filter data based on selectedClient
  const getFilteredData = () => {
    if (selectedClient === 'all') {
      return allClientsData;
    } else if (selectedClient === 'company-alpha') {
      return allClientsData.filter(client => client.name === 'Company Alpha');
    } else if (selectedClient === 'acme-industries') {
      return allClientsData.filter(client => client.name === 'Acme Industries');
    } else if (selectedClient === 'western-manufacturing') {
      return allClientsData.filter(client => client.name === 'Western Manufacturing');
    }
    return allClientsData;
  };
  
  const data = getFilteredData();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Client Gas Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={chartType === 'pie' ? 100 : 80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  chartType === 'pie' ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} m³`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDistributionChart;
