import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
  glassmorphic?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = true, 
  glassmorphic = false 
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        glassmorphic
          ? "bg-white/10 dark:bg-white/5 backdrop-blur-xl border-white/20 dark:border-white/10"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
        hover && "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
        "shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};