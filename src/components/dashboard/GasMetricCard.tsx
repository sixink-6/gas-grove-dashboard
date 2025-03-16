
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';
import GlassMorphism from '../ui/GlassMorphism';
import StatusIndicator from './StatusIndicator';

type MetricTrend = 'up' | 'down' | 'neutral';
type MetricStatus = 'normal' | 'warning' | 'critical' | 'offline';
type MetricImportance = 'primary' | 'secondary' | 'tertiary';

interface GasMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: MetricTrend;
  trendValue?: string;
  status?: MetricStatus;
  importance?: MetricImportance;
  subtitle?: string;
  className?: string;
  animated?: boolean;
  animationDelay?: number;
  suffix?: React.ReactNode;
}

export const GasMetricCard = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  status = 'normal',
  importance = 'primary',
  subtitle,
  className,
  animated = true,
  animationDelay = 0,
  suffix,
}: GasMetricCardProps) => {
  const importanceClasses = {
    primary: 'shadow-card',
    secondary: 'shadow-metric',
    tertiary: '',
  };

  const trendColors = {
    up: 'text-gas-red-500',
    down: 'text-gas-green-500',
    neutral: 'text-gas-neutral-500',
  };

  const animationClass = animated 
    ? 'animate-scale-in opacity-0' 
    : '';

  const animationStyle = animated && animationDelay 
    ? { animationDelay: `${animationDelay}ms`, animationFillMode: 'forwards' } 
    : {};

  return (
    <GlassMorphism
      intensity="medium"
      className={cn(
        'p-5 rounded-xl',
        importanceClasses[importance],
        'transition-all-300 hover:translate-y-[-2px]',
        animationClass,
        className
      )}
      style={animationStyle}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gas-neutral-500">{title}</h3>
        <div className="flex items-center gap-2">
          {status && <StatusIndicator status={status} size="sm" />}
          {suffix ? (
            suffix
          ) : (
            <button className="text-gas-neutral-400 hover:text-gas-neutral-900 dark:hover:text-gas-neutral-100 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-semibold text-gas-neutral-900 dark:text-white">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-gas-neutral-500 mb-0.5">{unit}</span>
        )}
      </div>
      
      {(trend || subtitle) && (
        <div className="flex items-center gap-2">
          {trend && (
            <div className={cn("flex items-center gap-1", trendColors[trend])}>
              {trend === 'up' ? <ArrowUp size={14} /> : trend === 'down' ? <ArrowDown size={14} /> : null}
              <span className="text-xs font-medium">{trendValue}</span>
            </div>
          )}
          
          {subtitle && (
            <span className="text-xs text-gas-neutral-500">{subtitle}</span>
          )}
        </div>
      )}
      
      {icon && (
        <div className="absolute top-4 right-4 text-gas-neutral-200 dark:text-gas-neutral-700 opacity-30">
          {icon}
        </div>
      )}
    </GlassMorphism>
  );
};

export default GasMetricCard;
