
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

interface ConsumptionTableProps {
  dateRange: {
    from: Date;
    to: Date;
  };
  selectedClient?: string;
}

// Generate sample data - in a real app, this would come from an API
const generateTableData = (from: Date, to: Date, selectedClient: string) => {
  const data = [];
  const days = Math.min(30, Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
  const startDate = new Date(from);
  
  const clients = [
    { id: 'company-alpha', name: 'Company Alpha', meterId: 'GM-NY-001' },
    { id: 'acme-industries', name: 'Acme Industries', meterId: 'GM-CHI-002' },
    { id: 'western-manufacturing', name: 'Western Manufacturing', meterId: 'GM-LA-003' },
  ];
  
  // Filter clients based on selection
  const filteredClients = selectedClient === 'all' 
    ? clients 
    : clients.filter(client => client.id === selectedClient);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    for (const client of filteredClients) {
      data.push({
        date: date.toISOString().split('T')[0],
        client: client.name,
        meterId: client.meterId,
        consumption: Math.floor(Math.random() * 100) + 50,
        cost: (Math.floor(Math.random() * 100) + 50) * 15000, // cost in Rupiah
      });
    }
  }
  
  return data;
};

const ConsumptionTable = ({ dateRange, selectedClient = 'all' }: ConsumptionTableProps) => {
  const data = generateTableData(dateRange.from, dateRange.to, selectedClient);
  
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Meter ID</TableHead>
              <TableHead className="text-right">Consumption (m³)</TableHead>
              <TableHead className="text-right">Cost (Rupiah)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 10).map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>{row.meterId}</TableCell>
                <TableCell className="text-right">{row.consumption}</TableCell>
                <TableCell className="text-right">{row.cost.toLocaleString('id-ID')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ConsumptionTable;
