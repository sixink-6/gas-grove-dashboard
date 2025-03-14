
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Clock, CheckCircle2, Bell } from 'lucide-react';

interface AlertStatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}

const AlertStatCard = ({ title, value, icon, className }: AlertStatCardProps) => (
  <Card className={`bg-white/70 dark:bg-gray-800/70 shadow-sm ${className}`}>
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm sm:text-base font-medium text-gas-neutral-500 dark:text-gas-neutral-400">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gas-neutral-900 dark:text-white mt-1">
            {value}
          </h3>
        </div>
        <div className="h-12 w-12 bg-gas-blue-50 dark:bg-gas-blue-900/30 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AlertStatCards = () => {
  // Mocked data - would come from your API in a real application
  const stats = [
    { 
      title: 'Total Alerts', 
      value: 128, 
      icon: <Bell className="h-6 w-6 text-gas-blue-500 dark:text-gas-blue-400" />,
      className: ''
    },
    { 
      title: 'Open Alerts', 
      value: 24, 
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      className: ''
    },
    { 
      title: 'In Progress', 
      value: 15, 
      icon: <Clock className="h-6 w-6 text-gas-purple-500 dark:text-gas-purple-400" />,
      className: ''
    },
    { 
      title: 'Resolved', 
      value: 89, 
      icon: <CheckCircle2 className="h-6 w-6 text-gas-green-500 dark:text-gas-green-400" />,
      className: ''
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <AlertStatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          className={stat.className}
        />
      ))}
    </div>
  );
};

export default AlertStatCards;
