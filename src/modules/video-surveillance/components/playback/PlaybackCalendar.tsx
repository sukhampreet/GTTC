import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';

const DAYS_WITH_FOOTAGE = new Set([1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 19, 20, 21]);

export interface PlaybackCalendarProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export function PlaybackCalendar({ selectedDay, onSelectDay }: PlaybackCalendarProps) {
  const [monthLabel] = useState('August 2026');
  const leadingBlanks = 5; // Aug 2026 starts on a Saturday
  const daysInMonth = 31;

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Calendar</AppCardTitle>
        <div className="flex items-center gap-1">
          <button className="rounded-(--radius-sm) p-1 text-text-tertiary hover:bg-surface-hover" title="Previous month">
            <ChevronLeft className="size-3.5" />
          </button>
          <span className="text-[11.5px] text-text-secondary">{monthLabel}</span>
          <button className="rounded-(--radius-sm) p-1 text-text-tertiary hover:bg-surface-hover" title="Next month">
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </AppCardHeader>
      <AppCardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-text-tertiary">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <span key={`b-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={cn(
                'relative flex aspect-square items-center justify-center rounded-(--radius-sm) text-[11px] transition-colors',
                selectedDay === day
                  ? 'bg-primary-500 text-white'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
              )}
            >
              {day}
              {DAYS_WITH_FOOTAGE.has(day) && selectedDay !== day && (
                <span className="absolute bottom-0.5 size-1 rounded-full bg-info-400" />
              )}
            </button>
          ))}
        </div>
      </AppCardContent>
    </AppCard>
  );
}
