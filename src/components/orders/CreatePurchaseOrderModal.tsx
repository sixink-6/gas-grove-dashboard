
import React, { useState } from 'react';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Sample client data
const clients = [
  { id: 'company-alpha', name: 'Company Alpha' },
  { id: 'acme-industries', name: 'Acme Industries' },
  { id: 'western-manufacturing', name: 'Western Manufacturing' },
];

// Form schema
const orderFormSchema = z.object({
  clientId: z.string({ required_error: "Client is required" }),
  poDate: z.date({ required_error: "PO date is required" }),
  deliveryDate: z.date({ required_error: "Delivery date is required" }),
  deliveryTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Valid time format is required (HH:MM)" }),
  deliveryAddress: z.string().min(5, { message: "Delivery address is required" }),
  picName: z.string().min(2, { message: "PIC name is required" }),
  picPhone: z.string().min(5, { message: "PIC phone is required" }),
  notes: z.string().optional(),
  discount: z.number().min(0).optional(),
  deliveryFee: z.number().min(0),
  taxRate: z.number().min(0).max(100),
  items: z.array(
    z.object({
      name: z.string().min(1, { message: "Item name is required" }),
      description: z.string().optional(),
      quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
      price: z.number().min(0, { message: "Price must be positive" }),
    })
  ).min(1, { message: "At least one item is required" }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const defaultValues: Partial<OrderFormValues> = {
  poDate: new Date(),
  deliveryDate: new Date(),
  deliveryTime: "14:00",
  items: [{ name: "", description: "", quantity: 1, price: 0 }],
  discount: 0,
  deliveryFee: 20,
  taxRate: 10,
};

interface CreatePurchaseOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateOrder: (order: any) => void;
}

const CreatePurchaseOrderModal = ({ 
  open, 
  onOpenChange,
  onCreateOrder
}: CreatePurchaseOrderModalProps) => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues,
  });

  const { control, watch, setValue, getValues } = form;
  const items = watch("items");
  
  // Calculate totals
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = getValues("discount") || 0;
    const deliveryFee = getValues("deliveryFee") || 0;
    const taxRate = getValues("taxRate") || 0;
    
    const afterDiscount = subtotal - discount;
    const withDelivery = afterDiscount + deliveryFee;
    const tax = withDelivery * (taxRate / 100);
    
    return withDelivery + tax;
  };

  const addItem = () => {
    const currentItems = getValues("items") || [];
    setValue("items", [...currentItems, { name: "", description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    const currentItems = getValues("items") || [];
    if (currentItems.length > 1) {
      setValue("items", currentItems.filter((_, i) => i !== index));
    }
  };

  const onSubmit = (data: OrderFormValues) => {
    // Format dates properly
    const formattedDeliveryDateTime = `${format(data.deliveryDate, 'yyyy-MM-dd')} ${data.deliveryTime}`;
    
    // Create a PO ID (in a real app, this would likely come from the backend)
    const poId = `PO-${format(new Date(), 'yyyy')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const subtotal = calculateSubtotal();
    const total = calculateTotal();
    
    // Create the new order object
    const newOrder = {
      id: poId,
      clientId: data.clientId,
      clientName: clients.find(c => c.id === data.clientId)?.name,
      poDate: format(data.poDate, 'yyyy-MM-dd'),
      deliveryDate: formattedDeliveryDateTime,
      status: 'pending',
      deliveryAddress: data.deliveryAddress,
      picName: data.picName,
      picPhone: data.picPhone,
      items: data.items,
      subtotal: subtotal,
      discount: data.discount || 0,
      deliveryFee: data.deliveryFee,
      taxRate: data.taxRate,
      total: total
    };

    onCreateOrder(newOrder);
    toast({
      title: "Purchase Order Created",
      description: `${poId} has been created successfully.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Purchase Order</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Client and Dates Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="poDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>PO Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Delivery Info */}
            <div>
              <h3 className="font-medium text-lg mb-4">Delivery Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Delivery Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Time</FormLabel>
                      <FormControl>
                        <Input placeholder="14:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter delivery address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="picName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIC Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact person..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="picPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIC Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Items */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Order Items</h3>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus size={16} className="mr-2" />
                  Add Item
                </Button>
              </div>
              
              {items.map((_, index) => (
                <Card key={index} className="mb-4">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Item #{index + 1}</h4>
                      {items.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`items.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Item name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Item description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit Price</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                {...field} 
                                onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pricing Section */}
            <div>
              <h3 className="font-medium text-lg mb-4">Order Totals</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field} 
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="deliveryFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Fee</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="taxRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Rate (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any special instructions..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gas-neutral-50 dark:bg-gas-neutral-900 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>-${(getValues("discount") || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>${(getValues("deliveryFee") || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({getValues("taxRate") || 0}%):</span>
                  <span>${((calculateSubtotal() - (getValues("discount") || 0) + (getValues("deliveryFee") || 0)) * ((getValues("taxRate") || 0) / 100)).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Purchase Order
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePurchaseOrderModal;
