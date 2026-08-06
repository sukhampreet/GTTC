import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          'size-3.5 cursor-pointer rounded-sm border border-border-strong bg-surface-raised accent-primary-500',
          className,
        )}
        {...props}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';
