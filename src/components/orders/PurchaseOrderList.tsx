
import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import CreatePurchaseOrderModal from './CreatePurchaseOrderModal';

// Temporary sample data for the demo
const samplePurchaseOrders = [
  {
    id: 'PO-2025-001',
    clientId: 'company-alpha',
    clientName: 'Company Alpha',
    poDate: '2025-04-22',
    deliveryDate: '2025-04-25 14:00',
    status: 'pending',
    total: 5250.00
  },
  {
    id: 'PO-2025-002',
    clientId: 'acme-industries',
    clientName: 'Acme Industries',
    poDate: '2025-04-23',
    deliveryDate: '2025-04-26 10:30',
    status: 'approved',
    total: 3780.50
  },
  {
    id: 'PO-2025-003',
    clientId: 'western-manufacturing',
    clientName: 'Western Manufacturing',
    poDate: '2025-04-24',
    deliveryDate: '2025-04-27 09:00',
    status: 'delivered',
    total: 7325.75
  }
];

const PurchaseOrderList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [purchaseOrders, setPurchaseOrders] = useState(samplePurchaseOrders);

  const filteredOrders = purchaseOrders.filter(
    order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePurchaseOrder = (newOrder) => {
    setPurchaseOrders([newOrder, ...purchaseOrders]);
    setIsCreateModalOpen(false);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Manage your gas purchase orders</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64"
                />
              </div>
              <Button onClick={() => setIsCreateModalOpen(true)} className="whitespace-nowrap">
                <Plus size={16} className="mr-1" />
                New Order
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>PO Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.clientName}</TableCell>
                      <TableCell>{order.poDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusBadgeColor(order.status)} font-normal`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <FileText size={16} />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      No purchase orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CreatePurchaseOrderModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
        onCreateOrder={handleCreatePurchaseOrder}
      />
    </div>
  );
};

export default PurchaseOrderList;
