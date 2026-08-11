import { cn } from '@/utils/cn';

export const GRID_LAYOUTS = [1, 4, 9, 16, 25, 36] as const;
export type GridLayout = (typeof GRID_LAYOUTS)[number];

export interface GridLayoutSwitcherProps {
  value: GridLayout;
  onChange: (value: GridLayout) => void;
}

export function GridLayoutSwitcher({ value, onChange }: GridLayoutSwitcherProps) {
  return (
    <div className="flex items-center gap-1 rounded-(--radius-md) border border-border-default bg-surface p-1">
      {GRID_LAYOUTS.map((layout) => (
        <button
          key={layout}
          type="button"
          onClick={() => onChange(layout)}
          className={cn(
            'flex size-7 items-center justify-center rounded-(--radius-sm) text-[11px] font-medium transition-colors',
            value === layout
              ? 'bg-primary-500/15 text-primary-300'
              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
          )}
          title={`${layout}-camera grid`}
        >
          {layout}
        </button>
      ))}
    </div>
  );
}

export function gridColumnsClass(layout: GridLayout): string {
  switch (layout) {
    case 1:
      return 'grid-cols-1';
    case 4:
      return 'grid-cols-2';
    case 9:
      return 'grid-cols-3';
    case 16:
      return 'grid-cols-4';
    case 25:
      return 'grid-cols-5';
    case 36:
      return 'grid-cols-6';
  }
}
