import type { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export function AppCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-(--radius-lg) border border-border-default bg-surface shadow-(--shadow-token-sm)',
        className,
      )}
      {...props}
    />
  );
}

export function AppCardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between border-b border-border-default px-4 py-3', className)}
      {...props}
    />
  );
}

export function AppCardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-sm font-semibold text-text-primary', className)} {...props} />;
}

export function AppCardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4', className)} {...props} />;
}
