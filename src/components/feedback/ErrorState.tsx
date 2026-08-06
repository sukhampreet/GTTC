import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'The data could not be loaded. Please try again.',
  onRetry,
  action,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}>
      <div className="flex size-11 items-center justify-center rounded-full bg-danger-bg text-danger-400">
        <AlertTriangle className="size-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="mt-1 max-w-sm text-xs text-text-secondary">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
      {action}
    </div>
  );
}
