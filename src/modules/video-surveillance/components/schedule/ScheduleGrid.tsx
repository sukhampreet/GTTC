import { useState } from 'react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import { scheduleProfiles } from '@/modules/video-surveillance/mock';
import type { ScheduleBlock, WeekDay } from '@/modules/video-surveillance/types';

const DAYS: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const MODE_COLOR: Record<ScheduleBlock['mode'], string> = {
  continuous: 'bg-info-500/70',
  motion: 'bg-warning-500/70',
  'ai-triggered': 'bg-danger-500/60',
  off: 'bg-transparent',
};

const MODE_LABEL: Record<ScheduleBlock['mode'], string> = {
  continuous: 'Continuous',
  motion: 'Motion Only',
  'ai-triggered': 'AI Triggered',
  off: 'Off',
};

function modeAt(blocks: ScheduleBlock[], day: WeekDay, hour: number): ScheduleBlock['mode'] {
  const block = blocks.find((b) => b.day === day && hour >= b.startHour && hour < b.endHour);
  return block?.mode ?? 'off';
}

export function ScheduleGrid() {
  const [activeProfileId, setActiveProfileId] = useState(scheduleProfiles[0]?.id ?? '');
  const profile = scheduleProfiles.find((p) => p.id === activeProfileId) ?? scheduleProfiles[0];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5 rounded-(--radius-md) border border-border-default bg-surface p-2">
        {scheduleProfiles.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveProfileId(p.id)}
            className={cn(
              'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors',
              activeProfileId === p.id
                ? 'bg-primary-500/12 text-primary-300'
                : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>{profile?.name}</AppCardTitle>
          <span className="text-[11px] text-text-tertiary">Applied to {profile?.appliedCameras} cameras</span>
        </AppCardHeader>
        <AppCardContent className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[60px_repeat(24,minmax(0,1fr))] gap-px">
              <span />
              {HOURS.map((h) => (
                <span key={h} className="text-center text-[9px] text-text-tertiary">{h}</span>
              ))}
              {DAYS.map((day) => (
                <div key={day} className="contents">
                  <span className="flex items-center text-[11px] font-medium text-text-secondary">{day}</span>
                  {HOURS.map((h) => (
                    <div
                      key={`${day}-${h}`}
                      title={`${day} ${h}:00 — ${MODE_LABEL[modeAt(profile?.blocks ?? [], day, h)]}`}
                      className={cn('h-5 rounded-[2px] border border-border-default/40', MODE_COLOR[modeAt(profile?.blocks ?? [], day, h)])}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-text-tertiary">
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-info-500/70" /> Continuous</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-warning-500/70" /> Motion Only</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-danger-500/60" /> AI Triggered</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm border border-border-strong" /> Off</span>
          </div>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
