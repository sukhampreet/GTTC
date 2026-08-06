import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/utils/cn';

export interface DataPlaceholderProps {
  rows?: number;
  className?: string;
}

export function DataPlaceholder({ rows = 5, className }: DataPlaceholderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full" />
      ))}
    </div>
  );
}
