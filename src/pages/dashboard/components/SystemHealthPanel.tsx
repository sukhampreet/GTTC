import { AppCard } from '@/components/ui/AppCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/utils/cn';
import { systemHealthMetrics } from '@/mock/dashboard';
import type { StatusTone } from '@/types/common';

const TONE_BAR_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-info-500',
  neutral: 'bg-secondary-500',
};

const TONE_TEXT_CLASSES: Record<StatusTone, string> = {
  success: 'text-success-400',
  danger: 'text-danger-400',
  warning: 'text-warning-400',
  info: 'text-info-400',
  neutral: 'text-text-secondary',
};

const TONE_ICON_BG: Record<StatusTone, string> = {
  success: 'text-success-400 bg-success-bg',
  danger: 'text-danger-400 bg-danger-bg',
  warning: 'text-warning-400 bg-warning-bg',
  info: 'text-info-400 bg-info-bg',
  neutral: 'text-text-secondary bg-surface-hover',
};

export function SystemHealthPanel() {
  return (
    <section>
      <SectionHeader title="System Health" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {systemHealthMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <AppCard key={metric.id} className="p-4">
              <div className="flex items-center gap-2.5">
                <div className={cn('flex size-7 shrink-0 items-center justify-center rounded-(--radius-md)', TONE_ICON_BG[metric.tone])}>
                  <Icon className="size-3.5" />
                </div>
                <p className="truncate text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
                  {metric.label}
                </p>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <span className="text-lg font-semibold tabular-nums text-text-primary">{metric.percent}%</span>
                <span className={cn('text-[11px] font-medium', TONE_TEXT_CLASSES[metric.tone])}>{metric.status}</span>
              </div>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
                <div
                  className={cn('h-full rounded-full', TONE_BAR_CLASSES[metric.tone])}
                  style={{ width: `${metric.percent}%` }}
                />
              </div>
            </AppCard>
          );
        })}
      </div>
    </section>
  );
}
