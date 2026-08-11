import type { ReactNode } from 'react';

import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';

export interface FormFieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  children?: ReactNode;
}

export function FormField({ label, hint, required, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-[12.5px] font-medium text-text-secondary">
        {label}
        {required && <span className="ml-0.5 text-danger-400">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-text-tertiary">{hint}</p>}
    </div>
  );
}

export interface TextFieldProps {
  label: string;
  defaultValue?: string;
  hint?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

export function TextField({ label, defaultValue, hint, type = 'text', required, placeholder }: TextFieldProps) {
  return (
    <FormField label={label} hint={hint} required={required}>
      <Input type={type} defaultValue={defaultValue} placeholder={placeholder} />
    </FormField>
  );
}

export interface SelectFieldProps {
  label: string;
  options: string[];
  defaultValue?: string;
  hint?: string;
  required?: boolean;
}

export function SelectField({ label, options, defaultValue, hint, required }: SelectFieldProps) {
  return (
    <FormField label={label} hint={hint} required={required}>
      <select
        defaultValue={defaultValue ?? options[0]}
        className="h-9 w-full rounded-(--radius-md) border border-border-default bg-surface px-3 text-[13px] text-text-primary outline-none focus:border-primary-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export interface ToggleFieldProps {
  label: string;
  defaultChecked?: boolean;
  hint?: string;
}

export function ToggleField({ label, defaultChecked, hint }: ToggleFieldProps) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-(--radius-md) border border-border-default bg-surface-raised px-3 py-2.5">
      <div>
        <p className="text-[12.5px] font-medium text-text-primary">{label}</p>
        {hint && <p className="text-[11px] text-text-tertiary">{hint}</p>}
      </div>
      <Checkbox defaultChecked={defaultChecked} />
    </div>
  );
}
