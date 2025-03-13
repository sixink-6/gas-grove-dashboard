
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  children: React.ReactNode;
}

export const GlassMorphism = ({
  intensity = 'medium',
  className,
  children,
  ...props
}: GlassMorphismProps) => {
  const intensityClasses = {
    light: 'bg-white/40 dark:bg-black/20 backdrop-blur-md',
    medium: 'bg-white/60 dark:bg-black/40 backdrop-blur-lg',
    heavy: 'bg-white/80 dark:bg-black/60 backdrop-blur-xl',
  };

  return (
    <div
      className={cn(
        'border border-white/20 dark:border-white/10',
        intensityClasses[intensity],
        'shadow-glass',
        'rounded-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
