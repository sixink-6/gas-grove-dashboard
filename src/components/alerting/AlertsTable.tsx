
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  CheckSquare,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

type AlertStatus = 'open' | 'in-progress' | 'resolved';
type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

interface AlertItem {
  id: string;
  description: string;
  alertType: string;
  severity: AlertSeverity;
  createdAt: Date;
  status: AlertStatus;
  startDate: Date;
  endDate?: Date | null;
  resolvedBy?: string | null;
}

const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'ALERT-001',
    description: 'Gas pressure anomaly detected at Client A',
    alertType: 'Pressure Anomaly',
    severity: 'high',
    createdAt: new Date(2023, 10, 12, 10, 30),
    status: 'open',
    startDate: new Date(2023, 10, 12, 10, 30),
    endDate: null,
    resolvedBy: null
  },
  {
    id: 'ALERT-002',
    description: 'Temperature threshold exceeded at Client B',
    alertType: 'Temperature Alert',
    severity: 'critical',
    createdAt: new Date(2023, 10, 12, 9, 15),
    status: 'in-progress',
    startDate: new Date(2023, 10, 12, 9, 15),
    endDate: null,
    resolvedBy: null
  },
  {
    id: 'ALERT-003',
    description: 'Gas flow rate below threshold at Client C',
    alertType: 'Flow Rate Alert',
    severity: 'medium',
    createdAt: new Date(2023, 10, 11, 14, 22),
    status: 'resolved',
    startDate: new Date(2023, 10, 11, 14, 22),
    endDate: new Date(2023, 10, 11, 16, 45),
    resolvedBy: 'John Doe'
  },
  {
    id: 'ALERT-004',
    description: 'Sensor offline at Client D',
    alertType: 'Connectivity Issue',
    severity: 'high',
    createdAt: new Date(2023, 10, 10, 8, 5),
    status: 'resolved',
    startDate: new Date(2023, 10, 10, 8, 5),
    endDate: new Date(2023, 10, 10, 10, 30),
    resolvedBy: 'Jane Smith'
  },
  {
    id: 'ALERT-005',
    description: 'Potential gas leak detected at Client E',
    alertType: 'Safety Alert',
    severity: 'critical',
    createdAt: new Date(2023, 10, 9, 23, 11),
    status: 'open',
    startDate: new Date(2023, 10, 9, 23, 11),
    endDate: null,
    resolvedBy: null
  },
  {
    id: 'ALERT-006',
    description: 'Battery level low on meter at Client F',
    alertType: 'Maintenance Alert',
    severity: 'low',
    createdAt: new Date(2023, 10, 9, 13, 45),
    status: 'in-progress',
    startDate: new Date(2023, 10, 9, 13, 45),
    endDate: null,
    resolvedBy: null
  },
  {
    id: 'ALERT-007',
    description: 'Calibration required at Client G',
    alertType: 'Maintenance Alert',
    severity: 'medium',
    createdAt: new Date(2023, 10, 8, 9, 30),
    status: 'resolved',
    startDate: new Date(2023, 10, 8, 9, 30),
    endDate: new Date(2023, 10, 8, 11, 15),
    resolvedBy: 'Mike Johnson'
  }
];

const AlertsTable = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<AlertItem[]>(MOCK_ALERTS);
  const [currentPage, setCurrentPage] = useState(1);
  const alertsPerPage = 5;

  // Get current alerts
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);
  const totalPages = Math.ceil(alerts.length / alertsPerPage);

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge className="bg-amber-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-400">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case 'open':
        return (
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-amber-600 dark:text-amber-400">Open</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gas-purple-500 dark:text-gas-purple-400" />
            <span className="text-gas-purple-600 dark:text-gas-purple-400">In Progress</span>
          </div>
        );
      case 'resolved':
        return (
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-gas-green-500 dark:text-gas-green-400" />
            <span className="text-gas-green-600 dark:text-gas-green-400">Resolved</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleViewAlert = (id: string) => {
    toast({
      title: "Viewing Alert Details",
      description: `Viewing details for alert ${id}`,
    });
  };

  const handleMarkInProgress = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'in-progress' } : alert
    ));
    toast({
      title: "Alert Status Updated",
      description: `Alert ${id} marked as in progress`,
    });
  };

  const handleMarkResolved = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? {
        ...alert,
        status: 'resolved',
        endDate: new Date(),
        resolvedBy: 'Current User'
      } : alert
    ));
    toast({
      title: "Alert Resolved",
      description: `Alert ${id} has been resolved`,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gas-neutral-900 dark:text-white">Alert Logs</h3>
        <p className="text-sm text-gas-neutral-500">
          View and manage all system alerts across clients
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="hidden lg:table-cell">Datetime</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Start Date</TableHead>
                <TableHead className="hidden lg:table-cell">End Date</TableHead>
                <TableHead className="hidden lg:table-cell">Resolved By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAlerts.length > 0 ? (
                currentAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">
                      <div className="max-w-[200px] truncate">
                        {alert.description}
                      </div>
                      <div className="text-xs text-gas-neutral-500 dark:text-gas-neutral-400 md:hidden">
                        {alert.alertType}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{alert.alertType}</TableCell>
                    <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{formatDate(alert.createdAt)}</TableCell>
                    <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(alert.startDate)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {alert.endDate ? formatDate(alert.endDate) : '-'}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {alert.resolvedBy || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewAlert(alert.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {alert.status === 'open' && (
                            <DropdownMenuItem onClick={() => handleMarkInProgress(alert.id)}>
                              <Clock className="mr-2 h-4 w-4" />
                              Mark In-Progress
                            </DropdownMenuItem>
                          )}
                          {(alert.status === 'open' || alert.status === 'in-progress') && (
                            <DropdownMenuItem onClick={() => handleMarkResolved(alert.id)}>
                              <CheckSquare className="mr-2 h-4 w-4" />
                              Mark Resolved
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-gas-neutral-500">
                    No alerts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {alerts.length > alertsPerPage && (
          <div className="py-4 border-t">
            <Pagination>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsTable;
