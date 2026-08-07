import { Camera, DoorOpen, FlameKindling, ParkingSquare, Thermometer } from 'lucide-react';

import { cn } from '@/utils/cn';
import { campusMarkers } from '@/modules/live-monitoring/mock/campus';

const TONE_FILL: Record<string, string> = {
  success: 'fill-success-500/10 stroke-success-500/50',
  warning: 'fill-warning-500/10 stroke-warning-500/50',
  danger: 'fill-danger-500/10 stroke-danger-500/50',
  info: 'fill-info-500/10 stroke-info-500/50',
  neutral: 'fill-surface-hover stroke-border-strong',
};

const TONE_DOT: Record<string, string> = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  info: 'bg-info-500',
  neutral: 'bg-secondary-500',
};

/** Professional campus placeholder — building footprints with device-category icon counts. */
export function CampusOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="rounded-(--radius-lg) border border-border-default bg-surface p-4 xl:col-span-2">
        <svg viewBox="0 0 460 340" className="h-auto w-full">
          <rect x="0" y="0" width="460" height="340" className="fill-surface-raised" rx="8" />
          {campusMarkers.map((marker) => (
            <g key={marker.id}>
              <rect
                x={marker.x}
                y={marker.y}
                width={marker.width}
                height={marker.height}
                rx="6"
                className={cn('stroke-1', TONE_FILL[marker.tone])}
              />
              <circle cx={marker.x + 10} cy={marker.y + 10} r="4" className={TONE_DOT[marker.tone]} />
              <text
                x={marker.x + marker.width / 2}
                y={marker.y + marker.height / 2}
                textAnchor="middle"
                className="fill-text-secondary text-[10px] font-medium"
              >
                {marker.building.split(' — ')[0]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="space-y-3">
        {campusMarkers.map((marker) => (
          <div key={marker.id} className="rounded-(--radius-lg) border border-border-default bg-surface p-3">
            <div className="flex items-center gap-2">
              <span className={cn('size-2 rounded-full', TONE_DOT[marker.tone])} />
              <p className="text-[12.5px] font-medium text-text-primary">{marker.building}</p>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-1 text-center">
              <IconStat icon={Camera} value={marker.cameras} />
              <IconStat icon={DoorOpen} value={marker.doors} />
              <IconStat icon={FlameKindling} value={marker.fireDevices} />
              <IconStat icon={ParkingSquare} value={marker.parkingDevices} />
              <IconStat icon={Thermometer} value={marker.environmentSensors} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IconStat({ icon: Icon, value }: { icon: typeof Camera; value: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-(--radius-sm) bg-surface-hover py-1.5">
      <Icon className="size-3 text-text-tertiary" />
      <span className="text-[11px] font-semibold tabular-nums text-text-primary">{value}</span>
    </div>
  );
}
