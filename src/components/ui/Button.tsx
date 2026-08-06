import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-(--radius-md) text-[13px] font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 border border-primary-500',
        secondary:
          'bg-surface-raised text-text-primary border border-border-default hover:bg-surface-hover',
        outline: 'bg-transparent text-text-primary border border-border-strong hover:bg-surface-hover',
        ghost: 'bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-transparent',
        danger: 'bg-danger-600 text-white hover:bg-danger-500 border border-danger-600',
      },
      size: {
        sm: 'h-7 px-2.5 text-xs',
        md: 'h-9 px-3.5',
        lg: 'h-10 px-5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
