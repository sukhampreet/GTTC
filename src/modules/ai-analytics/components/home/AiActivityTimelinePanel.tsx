import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cn } from '@/utils/cn';
import { aiActivityTimeline } from '@/modules/ai-analytics/mock';
import type { StatusTone } from '@/types/common';

const DOT_TONE: Record<StatusTone, string> = {
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  neutral: 'bg-text-tertiary',
};

export function AiActivityTimelinePanel() {
  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>AI Activity Timeline</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="flex-1">
        <ol className="space-y-3.5">
          {aiActivityTimeline.map((entry) => (
            <li key={entry.id} className="flex items-start gap-3">
              <span className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', DOT_TONE[entry.tone])} />
              <div className="min-w-0">
                <p className="text-[12.5px] text-text-secondary">{entry.description}</p>
                <p className="mt-0.5 text-[10.5px] text-text-tertiary">{entry.time}</p>
              </div>
            </li>
          ))}
        </ol>
      </AppCardContent>
    </AppCard>
  );
}
