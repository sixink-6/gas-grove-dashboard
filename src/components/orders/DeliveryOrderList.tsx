import React, { useState } from 'react';
import { FileText, Search, CheckCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const sampleDeliveryOrders = [
  {
    id: 'DO-2025-001',
    poId: 'PO-2025-002',
    clientId: 'acme-industries',
    clientName: 'Acme Industries',
    deliveryDate: '2025-04-26 10:30',
    status: 'scheduled',
    items: [
      { name: 'Propane Gas Tank', quantity: 5, price: 450 },
      { name: 'Gas Regulator', quantity: 2, price: 120 }
    ],
    total: 3780.50
  },
  {
    id: 'DO-2025-002',
    poId: 'PO-2025-003',
    clientId: 'western-manufacturing',
    clientName: 'Western Manufacturing',
    deliveryDate: '2025-04-27 09:00',
    status: 'in-transit',
    items: [
      { name: 'Industrial Gas Cylinder', quantity: 10, price: 650 },
      { name: 'Safety Valve', quantity: 5, price: 85 }
    ],
    total: 7325.75
  }
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const verificationSchema = z.object({
  driverName: z.string().min(2, { message: "Driver name is required" }),
  driverPhone: z.string().min(5, { message: "Driver phone is required" }),
  receiverName: z.string().min(2, { message: "Receiver name is required" }),
  receiverPhone: z.string().min(5, { message: "Receiver phone is required" }),
  notes: z.string().optional(),
  deliveryImages: z
    .custom<FileList>()
    .refine((files) => files?.length >= 1, "At least one delivery image is required")
    .refine((files) => {
      return files?.length > 0 ? files[0].size <= MAX_FILE_SIZE : true;
    }, "Max image size is 5MB")
    .refine((files) => {
      return files?.length > 0 ? ACCEPTED_IMAGE_TYPES.includes(files[0].type) : true;
    }, "Only .jpg, .jpeg, .png and .webp formats are supported")
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

const DeliveryOrderList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryOrders, setDeliveryOrders] = useState(sampleDeliveryOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      driverName: '',
      driverPhone: '',
      receiverName: '',
      receiverPhone: '',
      notes: ''
    },
  });

  const filteredOrders = deliveryOrders.filter(
    order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.poId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerifyDelivery = (data: VerificationFormValues) => {
    const file = data.deliveryImages[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const updatedOrders = deliveryOrders.map(order => 
        order.id === selectedOrder.id 
          ? { 
              ...order, 
              status: 'delivered',
              verifiedBy: {
                driver: { name: data.driverName, phone: data.driverPhone },
                receiver: { name: data.receiverName, phone: data.receiverPhone },
                notes: data.notes,
                deliveryImage: e.target?.result,
                timestamp: new Date().toISOString()
              }
            } 
          : order
      );
      setDeliveryOrders(updatedOrders);
      setIsVerifyModalOpen(false);
      setSelectedOrder(null);
      
      toast({
        title: "Delivery Verified",
        description: `${selectedOrder.id} has been successfully verified and marked as delivered.`
      });

      form.reset();
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const openVerifyModal = (order) => {
    setSelectedOrder(order);
    setIsVerifyModalOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'in-transit': return 'bg-blue-100 text-blue-800 border-blue-200';
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
              <CardTitle>Delivery Orders</CardTitle>
              <CardDescription>Track and verify gas deliveries</CardDescription>
            </div>
            <div className="relative">
              <Input
                placeholder="Search deliveries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DO ID</TableHead>
                  <TableHead>PO Reference</TableHead>
                  <TableHead>Client</TableHead>
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
                      <TableCell>{order.poId}</TableCell>
                      <TableCell>{order.clientName}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusBadgeColor(order.status)} font-normal`}>
                          {order.status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Details">
                            <FileText size={16} />
                            <span className="sr-only">View details</span>
                          </Button>
                          {order.status !== 'delivered' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 flex items-center gap-1 text-xs"
                              onClick={() => openVerifyModal(order)}
                            >
                              <CheckCircle size={14} />
                              Verify
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      No delivery orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Delivery</DialogTitle>
            <DialogDescription>
              Please fill in the verification details and upload a delivery proof image.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">DO ID:</span>
                <span>{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Client:</span>
                <span>{selectedOrder.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Delivery Date:</span>
                <span>{selectedOrder.deliveryDate}</span>
              </div>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVerifyDelivery)} className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Driver Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="driverName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="driverPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driver Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Receiver Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="receiverName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receiver Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="receiverPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receiver Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Notes</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Any comments about the delivery..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryImages"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Delivery Proof Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                          </div>
                          <input
                            {...field}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files?.length) {
                                onChange(files);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setIsVerifyModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Verify Delivery
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryOrderList;
