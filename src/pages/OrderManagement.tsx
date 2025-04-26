
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PurchaseOrderList from '@/components/orders/PurchaseOrderList';
import DeliveryOrderList from '@/components/orders/DeliveryOrderList';

const OrderManagement = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('purchase-orders');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gas-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      
      <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'pl-0' : 'pl-64'}`}>
        <Header 
          title="Order Management" 
          subtitle="Manage purchase orders and deliveries"
        />
        
        <main className="container mx-auto p-2 sm:p-4 animate-fade-in">
          <GlassMorphism intensity="light" className="p-3 sm:p-6 rounded-xl">
            <Tabs defaultValue="purchase-orders" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
                <TabsTrigger value="delivery-orders">Delivery Orders</TabsTrigger>
              </TabsList>
              <TabsContent value="purchase-orders" className="mt-4">
                <PurchaseOrderList />
              </TabsContent>
              <TabsContent value="delivery-orders" className="mt-4">
                <DeliveryOrderList />
              </TabsContent>
            </Tabs>
          </GlassMorphism>
        </main>
      </div>
    </div>
  );
};

export default OrderManagement;
