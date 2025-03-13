
import React from 'react';
import { 
  Area, 
  AreaChart, 
  Line, 
  LineChart, 
  Bar, 
  BarChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '@/lib/utils';
import GlassMorphism from '../ui/GlassMorphism';

type ChartType = 'line' | 'area' | 'bar';

interface ChartComponentProps {
  type?: ChartType;
  data: any[];
  dataKey: string;
  strokeColor?: string;
  fillColor?: string;
  height?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  showAnimations?: boolean;
  showGrid?: boolean;
  yAxisFormatter?: (value: number) => string;
}

export const ChartComponent = ({
  type = 'line',
  data,
  dataKey,
  strokeColor = 'hsl(var(--primary))',
  fillColor = 'hsl(var(--primary) / 0.2)',
  height = 300,
  title,
  subtitle,
  className,
  showAnimations = true,
  showGrid = true,
  yAxisFormatter,
}: ChartComponentProps) => {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 10, left: 0, bottom: 0 },
    };

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />}
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis 
              tick={{ fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={yAxisFormatter} 
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: 'none', 
                padding: '8px 12px' 
              }} 
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fillColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={fillColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={strokeColor} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorGradient)" 
              animationDuration={showAnimations ? 1500 : 0}
              animationEasing="ease-out"
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />}
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis 
              tick={{ fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={yAxisFormatter} 
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: 'none', 
                padding: '8px 12px' 
              }} 
            />
            <Bar 
              dataKey={dataKey} 
              fill={fillColor}
              radius={[4, 4, 0, 0]}
              animationDuration={showAnimations ? 1500 : 0}
              animationEasing="ease-out"
            />
          </BarChart>
        );
      case 'line':
      default:
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />}
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis 
              tick={{ fontSize: 12 }} 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={yAxisFormatter} 
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                border: 'none', 
                padding: '8px 12px' 
              }} 
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={strokeColor} 
              strokeWidth={2}
              dot={{ fill: strokeColor, strokeWidth: 2, r: 4 }}
              activeDot={{ fill: strokeColor, strokeWidth: 2, r: 6 }}
              animationDuration={showAnimations ? 1500 : 0}
              animationEasing="ease-out"
            />
          </LineChart>
        );
    }
  };

  return (
    <GlassMorphism 
      intensity="light" 
      className={cn('p-4 rounded-xl overflow-hidden', className)}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium text-gas-neutral-900 dark:text-gas-neutral-100">{title}</h3>}
          {subtitle && <p className="text-sm text-gas-neutral-500 dark:text-gas-neutral-400">{subtitle}</p>}
        </div>
      )}
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </GlassMorphism>
  );
};

export default ChartComponent;
