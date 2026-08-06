import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-9 w-full rounded-(--radius-md) border bg-surface-raised px-3 text-[13px] text-text-primary placeholder:text-text-tertiary transition-colors',
          'border-border-strong focus:border-primary-500',
          invalid && 'border-danger-500 focus:border-danger-500',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
