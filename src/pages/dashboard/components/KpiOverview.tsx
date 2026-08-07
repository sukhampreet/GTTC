import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/utils/cn';
import { dashboardKpis } from '@/mock/dashboard';
import type { StatusTone } from '@/types/common';
import { ROUTES } from '@/constants/routes';
import { Sparkline } from './Sparkline';

const TONE_ICON_CLASSES: Record<StatusTone, string> = {
  success: 'text-success-400 bg-success-bg',
  danger: 'text-danger-400 bg-danger-bg',
  warning: 'text-warning-400 bg-warning-bg',
  info: 'text-info-400 bg-info-bg',
  neutral: 'text-text-secondary bg-surface-hover',
};

const TREND_CLASSES: Record<'up' | 'down' | 'flat', string> = {
  up: 'text-success-400',
  down: 'text-danger-400',
  flat: 'text-text-tertiary',
};

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus };

/** KPI ids that link into the Access Control module when clicked. */
const ACCESS_CONTROL_KPI_IDS = new Set(['access-controllers']);

export function KpiOverview() {
  const navigate = useNavigate();

  return (
    <section>
      <SectionHeader title="System Overview" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {dashboardKpis.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend ? TREND_ICON[kpi.trend.direction] : null;
          const isAccessControlLinked = ACCESS_CONTROL_KPI_IDS.has(kpi.id);

          return (
            <div
              key={kpi.id}
              role={isAccessControlLinked ? 'button' : undefined}
              tabIndex={isAccessControlLinked ? 0 : undefined}
              onClick={isAccessControlLinked ? () => navigate(ROUTES.accessControl) : undefined}
              onKeyDown={
                isAccessControlLinked
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') navigate(ROUTES.accessControl);
                    }
                  : undefined
              }
              className={cn(
                'flex flex-col gap-3 rounded-(--radius-lg) border border-border-default bg-surface p-4 text-left',
                isAccessControlLinked && 'cursor-pointer transition-colors hover:border-primary-500/60 hover:bg-surface-hover',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-(--radius-md)', TONE_ICON_CLASSES[kpi.tone])}>
                  <Icon className="size-4.5" />
                </div>
                {kpi.trend && TrendIcon && (
                  <span className={cn('flex items-center gap-1 text-[11px] font-medium', TREND_CLASSES[kpi.trend.direction])}>
                    <TrendIcon className="size-3" />
                    {kpi.trend.value}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">{kpi.label}</p>
                <p className="mt-0.5 text-xl font-semibold tabular-nums text-text-primary">{kpi.value}</p>
                {kpi.hint && <p className="mt-0.5 truncate text-[11px] text-text-tertiary">{kpi.hint}</p>}
              </div>

              {kpi.sparkline && <Sparkline data={kpi.sparkline} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
