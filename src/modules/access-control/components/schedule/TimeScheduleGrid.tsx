import { Clock } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { weekdayLabels } from '@/modules/access-control/mock';
import type { TimeScheduleRecord } from '@/modules/access-control/types';

export interface TimeScheduleGridProps {
  schedules: TimeScheduleRecord[];
}

export function TimeScheduleGrid({ schedules }: TimeScheduleGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {schedules.map((schedule) => (
        <AppCard key={schedule.id} className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[13.5px] font-semibold text-text-primary">{schedule.name}</p>
              <p className="text-[11px] text-text-tertiary">{schedule.shiftGroup}</p>
            </div>
            <StatusBadge tone={schedule.status === 'active' ? 'success' : 'neutral'}>
              {schedule.status === 'active' ? 'Active' : 'Inactive'}
            </StatusBadge>
          </div>

          <div className="flex items-center gap-2 rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-1.5 text-[12px] text-text-secondary">
            <Clock className="size-3.5 text-text-tertiary" />
            {schedule.startTime} – {schedule.endTime}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {weekdayLabels.map((day) => {
              const active = schedule.activeDays.includes(day);
              return (
                <span
                  key={day}
                  className={cn(
                    'flex size-7 items-center justify-center rounded-(--radius-sm) text-[10.5px] font-semibold',
                    active ? 'bg-primary-500/15 text-primary-300' : 'bg-surface-hover text-text-tertiary',
                  )}
                >
                  {day}
                </span>
              );
            })}
          </div>

          <p className="text-[11px] text-text-tertiary">
            {schedule.appliesToHolidays ? 'Applies on holidays' : 'Does not apply on holidays'}
          </p>
        </AppCard>
      ))}
    </div>
  );
}
