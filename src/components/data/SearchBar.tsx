import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export function SearchBar({ containerClassName, className, placeholder = 'Search…', ...props }: SearchBarProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-tertiary" />
      <input
        className={cn(
          'h-8 w-full rounded-(--radius-md) border border-border-strong bg-surface-raised pl-8 pr-3 text-xs text-text-primary placeholder:text-text-tertiary focus:border-primary-500',
          className,
        )}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
