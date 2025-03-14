
import React, { useState } from 'react';
import { CalendarIcon, FileDown, FilePlus, Printer, ChevronDown, BarChart, PieChart, LineChart } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReportDateRangePicker from './ReportDateRangePicker';
import ConsumptionTrendsChart from './ConsumptionTrendsChart';
import ClientDistributionChart from './ClientDistributionChart';
import ConsumptionTable from './ConsumptionTable';

type ReportType = 'consumption' | 'delivery' | 'efficiency';

const ReportingDashboard = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });
  
  const [reportType, setReportType] = useState<ReportType>('consumption');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
  
  const handleExportPDF = () => {
    // This would be implemented with a PDF generation library
    console.log('Exporting PDF...');
  };
  
  const handleExportCSV = () => {
    // This would be implemented with CSV export functionality
    console.log('Exporting CSV...');
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Gas Monitoring Reports</h2>
          <p className="text-muted-foreground">
            {format(dateRange.from, 'PPP')} - {format(dateRange.to, 'PPP')}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <FilePlus className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-4">Report Period</h3>
            <ReportDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-4">Report Type</h3>
            <Tabs defaultValue={reportType} onValueChange={(value) => setReportType(value as ReportType)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="consumption">Consumption</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-4">View Options</h3>
            <div className="flex space-x-2">
              <Button 
                variant={viewMode === 'chart' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('chart')}
                className="flex-1"
              >
                Chart
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setViewMode('table')}
                className="flex-1"
              >
                Table
              </Button>
            </div>
            
            {viewMode === 'chart' && (
              <div className="flex space-x-2 mt-2">
                <Button 
                  variant={chartType === 'line' ? 'secondary' : 'outline'} 
                  size="sm" 
                  onClick={() => setChartType('line')}
                  className="flex-1"
                >
                  <LineChart className="h-4 w-4" />
                </Button>
                <Button 
                  variant={chartType === 'bar' ? 'secondary' : 'outline'} 
                  size="sm" 
                  onClick={() => setChartType('bar')}
                  className="flex-1"
                >
                  <BarChart className="h-4 w-4" />
                </Button>
                <Button 
                  variant={chartType === 'pie' ? 'secondary' : 'outline'} 
                  size="sm" 
                  onClick={() => setChartType('pie')}
                  className="flex-1"
                >
                  <PieChart className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Report Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Consumption</h3>
            <p className="text-3xl font-bold">12,450 m³</p>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-green-500">↑ 15.2%</span> from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Daily Usage</h3>
            <p className="text-3xl font-bold">415 m³</p>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-green-500">↑ 3.8%</span> from previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Clients</h3>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-muted-foreground mt-2">
              Active in this period
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Report Content */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">
          {reportType === 'consumption' && 'Gas Consumption Report'}
          {reportType === 'delivery' && 'Gas Delivery Report'}
          {reportType === 'efficiency' && 'Gas Efficiency Report'}
        </h3>
        
        {viewMode === 'chart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConsumptionTrendsChart 
              chartType={chartType} 
              dateRange={dateRange} 
            />
            <ClientDistributionChart 
              chartType={chartType}
            />
          </div>
        ) : (
          <ConsumptionTable dateRange={dateRange} />
        )}
      </div>
    </div>
  );
};

export default ReportingDashboard;
