import { useState, type ReactNode } from 'react';

import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { cn } from '@/utils/cn';

export interface FormFieldProps {
  label: string;
  hint?: string;
  children?: ReactNode;
}

export function FormField({ label, hint, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-[12.5px] font-medium text-text-secondary">{label}</label>
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
}

export function TextField({ label, defaultValue, hint, type = 'text' }: TextFieldProps) {
  return (
    <FormField label={label} hint={hint}>
      <Input type={type} defaultValue={defaultValue} />
    </FormField>
  );
}

export interface SelectFieldProps {
  label: string;
  options: string[];
  defaultValue?: string;
  hint?: string;
}

export function SelectField({ label, options, defaultValue, hint }: SelectFieldProps) {
  return (
    <FormField label={label} hint={hint}>
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

export interface SliderFieldProps {
  label: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  hint?: string;
}

/** 0-100 style slider used by CP PLUS Image settings (Brightness, Contrast, Saturation, Sharpness, Gamma). */
export function SliderField({ label, defaultValue = 50, min = 0, max = 100, hint }: SliderFieldProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <FormField label={label} hint={hint}>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-raised accent-primary-500"
        />
        <span className="w-7 shrink-0 text-right text-[12px] tabular-nums text-text-secondary">{value}</span>
      </div>
    </FormField>
  );
}

export interface ReadOnlyFieldProps {
  label: string;
  value: string;
  hint?: string;
}

/** Displays a value the NVR owns — config that lives on the physical device, not this app. */
export function ReadOnlyField({ label, value, hint }: ReadOnlyFieldProps) {
  return (
    <FormField label={label} hint={hint}>
      <div className="flex h-9 w-full items-center rounded-(--radius-md) border border-border-default bg-surface px-3 text-[13px] text-text-tertiary">
        {value}
      </div>
    </FormField>
  );
}

export interface FieldGroupProps {
  title: string;
  children: ReactNode;
}

/** Labeled sub-section card, mirroring the NVR menu's left-hand sub-page grouping. */
export function FieldGroup({ title, children }: FieldGroupProps) {
  return (
    <div className="space-y-3">
      <h4 className="border-b border-border-default pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export interface SubTabsProps<T extends string> {
  tabs: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
}

/** Second-level pill nav, used for menus (e.g. Camera) that have their own sub-pages on the NVR. */
export function SubTabs<T extends string>({ tabs, active, onChange }: SubTabsProps<T>) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-border-default pb-3">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'rounded-(--radius-sm) px-2.5 py-1.5 text-[12px] font-medium transition-colors',
            active === t.id ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
