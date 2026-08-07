import { cn } from '@/utils/cn';
import type { CameraWallLayout } from '@/modules/live-monitoring/types';

const LAYOUTS: CameraWallLayout[] = [1, 4, 9, 16, 25, 36];

export interface LayoutSwitcherProps {
  value: CameraWallLayout;
  onChange: (value: CameraWallLayout) => void;
}

export function LayoutSwitcher({ value, onChange }: LayoutSwitcherProps) {
  return (
    <div className="flex items-center gap-1 rounded-(--radius-md) border border-border-default bg-surface p-1">
      {LAYOUTS.map((layout) => (
        <button
          key={layout}
          type="button"
          onClick={() => onChange(layout)}
          className={cn(
            'h-7 min-w-9 rounded-(--radius-sm) px-2 text-[11.5px] font-medium tabular-nums transition-colors',
            value === layout
              ? 'bg-primary-500/15 text-primary-300'
              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
          )}
        >
          {layout}
        </button>
      ))}
    </div>
  );
}
