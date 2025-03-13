
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'normal' | 'warning' | 'critical' | 'offline';

interface StatusIndicatorProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
  label?: string;
  className?: string;
}

export const StatusIndicator = ({
  status,
  size = 'md',
  showPulse = true,
  label,
  className,
}: StatusIndicatorProps) => {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const statusClasses = {
    normal: 'bg-gas-green-500',
    warning: 'bg-amber-500',
    critical: 'bg-gas-red-500',
    offline: 'bg-gas-neutral-400',
  };

  const labelColors = {
    normal: 'text-gas-green-600 dark:text-gas-green-400',
    warning: 'text-amber-600 dark:text-amber-400',
    critical: 'text-gas-red-600 dark:text-gas-red-400',
    offline: 'text-gas-neutral-600 dark:text-gas-neutral-400',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="relative flex h-3 w-3">
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full',
            statusClasses[status],
            sizeClasses[size]
          )}
        />
        {showPulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full opacity-75',
              statusClasses[status],
              sizeClasses[size],
              status !== 'offline' && 'animate-pulse-soft'
            )}
          />
        )}
      </span>
      {label && (
        <span className={cn('text-sm font-medium', labelColors[status])}>
          {label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;
