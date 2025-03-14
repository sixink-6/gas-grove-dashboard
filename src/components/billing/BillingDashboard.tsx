
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download, Mail } from 'lucide-react';
import InvoicesTable from './InvoicesTable';
import CreateInvoiceModal from './CreateInvoiceModal';
import { useToast } from "@/hooks/use-toast";

const BillingDashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateInvoice = () => {
    setIsCreateModalOpen(true);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // This would be connected to an actual download function in a real app
    toast({
      title: "Invoice Download Started",
      description: `Invoice #${invoiceId} is being prepared for download.`,
    });
  };

  const handleSendInvoice = (invoiceId: string) => {
    // This would be connected to an actual email sending function in a real app
    toast({
      title: "Invoice Sent Successfully",
      description: `Invoice #${invoiceId} has been sent to the client's email.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gas-neutral-900 dark:text-white">
            Payment & Billing
          </h2>
          <p className="text-gas-neutral-500 mt-1">
            Create and manage client invoices
          </p>
        </div>
        <Button 
          onClick={handleCreateInvoice} 
          className="bg-gas-blue-500 hover:bg-gas-blue-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <InvoicesTable 
        onDownload={handleDownloadInvoice}
        onSendEmail={handleSendInvoice}
      />

      <CreateInvoiceModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default BillingDashboard;
