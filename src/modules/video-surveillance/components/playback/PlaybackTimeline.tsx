const HOUR_MARKS = Array.from({ length: 13 }, (_, i) => i * 2);

export interface PlaybackTimelineProps {
  activeHour: number;
  segments: { startHour: number; endHour: number; type: 'continuous' | 'motion' | 'ai-event' }[];
}

const SEGMENT_COLOR: Record<PlaybackTimelineProps['segments'][number]['type'], string> = {
  continuous: 'bg-info-500/70',
  motion: 'bg-warning-500/70',
  'ai-event': 'bg-danger-500/70',
};

export function PlaybackTimeline({ activeHour, segments }: PlaybackTimelineProps) {
  return (
    <div className="rounded-(--radius-md) border border-border-default bg-surface p-3">
      <div className="relative h-8 w-full overflow-hidden rounded-(--radius-sm) bg-surface-raised">
        {segments.map((segment, i) => (
          <div
            key={i}
            className={`absolute inset-y-0 ${SEGMENT_COLOR[segment.type]}`}
            style={{
              left: `${(segment.startHour / 24) * 100}%`,
              width: `${((segment.endHour - segment.startHour) / 24) * 100}%`,
            }}
          />
        ))}
        <div
          className="absolute inset-y-0 w-0.5 bg-primary-300"
          style={{ left: `${(activeHour / 24) * 100}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-text-tertiary">
        {HOUR_MARKS.map((hour) => (
          <span key={hour}>{String(hour).padStart(2, '0')}:00</span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-4 text-[11px] text-text-tertiary">
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-info-500/70" /> Continuous</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-warning-500/70" /> Motion</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-danger-500/70" /> AI Event</span>
      </div>
    </div>
  );
}
