import { Loader2 } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const SIZE_CLASSES: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-9',
};

export function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  return (
    <div className="inline-flex items-center gap-2 text-text-secondary" role="status" aria-live="polite">
      <Loader2 className={cn('animate-spin text-primary-500', SIZE_CLASSES[size], className)} />
      {label && <span className="text-xs">{label}</span>}
    </div>
  );
}
