
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

// Sample data for demonstration
const sampleInvoices = [
  {
    id: 'INV-001',
    invoiceDate: '2023-10-15',
    dueDate: '2023-10-30',
    description: 'Gas usage for September 2023',
    totalConsumption: '125.5 m³',
    status: 'Paid',
    totalAmount: 1250000, // In Rupiah
  },
  {
    id: 'INV-002',
    invoiceDate: '2023-11-15',
    dueDate: '2023-11-30',
    description: 'Gas usage for October 2023',
    totalConsumption: '142.3 m³',
    status: 'Unpaid',
    totalAmount: 1423000,
  },
  {
    id: 'INV-003',
    invoiceDate: '2023-12-15',
    dueDate: '2023-12-30',
    description: 'Gas usage for November 2023',
    totalConsumption: '118.7 m³',
    status: 'Paid',
    totalAmount: 1187000,
  },
  {
    id: 'INV-004',
    invoiceDate: '2024-01-15',
    dueDate: '2024-01-30',
    description: 'Gas usage for December 2023',
    totalConsumption: '156.2 m³',
    status: 'Paid',
    totalAmount: 1562000,
  },
  {
    id: 'INV-005',
    invoiceDate: '2024-02-15',
    dueDate: '2024-02-29',
    description: 'Gas usage for January 2024',
    totalConsumption: '138.9 m³',
    status: 'Unpaid',
    totalAmount: 1389000,
  },
];

// Format currency to Rupiah
const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

interface InvoicesTableProps {
  onDownload: (invoiceId: string) => void;
  onSendEmail: (invoiceId: string) => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ onDownload, onSendEmail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // In a real app, this would be paginated from the backend
  const paginatedInvoices = sampleInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(sampleInvoices.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="text-xs font-semibold text-gas-neutral-700 dark:text-gas-neutral-300">ID Invoice</TableHead>
              <TableHead className="text-xs font-semibold text-gas-neutral-700 dark:text-gas-neutral-300">Invoice Date</TableHead>
              <TableHead className="text-xs font-semibold text-gas-neutral-700 dark:text-gas-neutral-300">Due Date</TableHead>
              <TableHead className="text-xs font-semibold text-gas-neutral-700 dark:text-gas-neutral-300">Description</TableHead>
              <TableHead className="text-xs font-semibold text-gas-neutral-700 dark:text-gas-neutral-300">Total Consumption</TableHead>
              <TableHead className="text-xs font-semibold text-gas-neutral-700 dark:text-gas-neutral-300">Status</TableHead>
              <TableHead className="text-xs font-semibold text-gas-neutral-700 dark:text-gas-neutral-300">Total Invoice</TableHead>
              <TableHead className="text-xs font-semibold text-gas-neutral-700 dark:text-gas-neutral-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-b border-gray-200 dark:border-gray-700">
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.invoiceDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>{invoice.totalConsumption}</TableCell>
                <TableCell>
                  <Badge 
                    variant={invoice.status === 'Paid' ? 'default' : 'destructive'}
                    className={invoice.status === 'Paid' ? 'bg-green-500' : ''}
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatRupiah(invoice.totalAmount)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onDownload(invoice.id)}
                      title="Download Invoice"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onSendEmail(invoice.id)}
                      title="Send Invoice via Email"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default InvoicesTable;
