import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { detectionEvents } from '@/modules/video-surveillance/mock';
import { titleCase } from '@/modules/video-surveillance/components/shared/statusTone';
import { DETECTION_CATEGORY_ICON } from '@/modules/video-surveillance/components/aiDetection/categoryIcons';
import type { DetectionEvent } from '@/modules/video-surveillance/types';

const STATUS_TONE: Record<DetectionEvent['status'], 'info' | 'success' | 'neutral'> = {
  new: 'info',
  acknowledged: 'success',
  dismissed: 'neutral',
};

export interface AlertTimelineProps {
  events?: DetectionEvent[];
  title?: string;
}

export function AlertTimeline({ events = detectionEvents, title = 'Alert Timeline' }: AlertTimelineProps) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>{title}</AppCardTitle>
        <span className="text-[11px] text-text-tertiary">{events.length} events</span>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {events.map((event) => {
            const Icon = DETECTION_CATEGORY_ICON[event.category];
            return (
              <li key={event.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-(--radius-md) bg-surface-hover text-text-secondary">
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-text-primary">
                      {titleCase(event.category)} detected — {event.camera}
                    </p>
                    <p className="truncate text-[11px] text-text-tertiary">{event.location} · {event.confidencePct}% confidence</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge tone={STATUS_TONE[event.status]} className="px-1.5 py-0">
                    {titleCase(event.status)}
                  </StatusBadge>
                  <span className="text-[11px] text-text-tertiary">{event.time}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
