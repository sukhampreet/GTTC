import type { ReactNode } from 'react';

export interface FormFieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
}

export function FormField({ label, children, hint }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium text-text-secondary">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-text-tertiary">{hint}</span>}
    </label>
  );
}
