import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ROUTES } from '@/constants/routes';
import { aiAlerts } from '@/modules/ai-analytics/mock';
import { AI_ANALYTICS_PATHS } from '@/modules/ai-analytics/constants/paths';
import { SEVERITY_TONE } from '@/modules/ai-analytics/components/shared/statusTone';

export function RecentAiAlertsPanel() {
  const navigate = useNavigate();
  const preview = aiAlerts.slice(0, 5);

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Recent AI Alerts</AppCardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate(`${ROUTES.aiAnalytics}/${AI_ANALYTICS_PATHS.alerts}`)}>
          View all
          <ArrowRight className="size-3.5" />
        </Button>
      </AppCardHeader>
      <AppCardContent className="flex-1 p-0">
        <ul className="divide-y divide-border-default">
          {preview.map((alert) => (
            <li key={alert.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-text-primary">{alert.alertType}</p>
                <p className="truncate text-[10.5px] text-text-tertiary">{alert.location} · {alert.camera}</p>
              </div>
              <StatusBadge tone={SEVERITY_TONE[alert.severity]} className="shrink-0 px-1.5 py-0">
                {alert.severity}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
