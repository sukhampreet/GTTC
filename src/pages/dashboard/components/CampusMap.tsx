import { Maximize2 } from 'lucide-react';

import { AppCard, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import { campusZones } from '@/mock/dashboard';
import type { StatusTone } from '@/types/common';

const TONE_FILL: Record<StatusTone, string> = {
  success: 'fill-success-500/15 stroke-success-500/60',
  danger: 'fill-danger-500/15 stroke-danger-500/60',
  warning: 'fill-warning-500/15 stroke-warning-500/60',
  info: 'fill-info-500/15 stroke-info-500/60',
  neutral: 'fill-surface-hover stroke-border-strong',
};

const TONE_DOT: Record<StatusTone, string> = {
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  neutral: 'bg-secondary-500',
};

export function CampusMap() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Campus Map</AppCardTitle>
        <button
          className="flex size-7 items-center justify-center rounded-(--radius-md) text-text-tertiary hover:bg-surface-hover hover:text-text-primary"
          aria-label="Expand campus map"
        >
          <Maximize2 className="size-3.5" />
        </button>
      </AppCardHeader>

      <div className="relative">
        <svg viewBox="0 0 560 330" className="h-auto w-full" role="img" aria-label="Campus zone overview placeholder">
          <rect x="0" y="0" width="560" height="330" className="fill-canvas" />
          <pattern id="campusGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-border-default" strokeWidth={1} />
          </pattern>
          <rect x="0" y="0" width="560" height="330" fill="url(#campusGrid)" />

          {campusZones.map((zone) => (
            <g key={zone.id}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                rx={4}
                strokeWidth={1.5}
                className={cn(TONE_FILL[zone.tone])}
              />
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2 - 4}
                textAnchor="middle"
                className="fill-text-primary text-[11px] font-medium"
              >
                {zone.name}
              </text>
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2 + 12}
                textAnchor="middle"
                className="fill-text-tertiary text-[10px]"
              >
                {zone.devices} devices
              </text>
            </g>
          ))}
        </svg>

        <div className="flex flex-wrap items-center gap-4 border-t border-border-default px-4 py-2.5">
          {(['success', 'warning', 'danger'] as StatusTone[]).map((tone) => (
            <div key={tone} className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
              <span className={cn('size-1.5 rounded-full', TONE_DOT[tone])} />
              {tone === 'success' ? 'Normal' : tone === 'warning' ? 'Attention' : 'Critical'}
            </div>
          ))}
          <span className="ml-auto text-[10px] text-text-tertiary">
            Illustrative overview · live GIS map integration planned for a later sprint
          </span>
        </div>
      </div>
    </AppCard>
  );
}
