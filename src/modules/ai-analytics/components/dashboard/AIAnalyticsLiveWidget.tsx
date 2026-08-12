import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, BellRing, ScanFace } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ROUTES } from '@/constants/routes';
import { aiAlerts, faceRecognitionEvents, personDetectionEvents, vehicleDetectionEvents, intrusionEvents } from '@/modules/ai-analytics/mock';
import { AI_ANALYTICS_PATHS } from '@/modules/ai-analytics/constants/paths';
import { SEVERITY_TONE } from '@/modules/ai-analytics/components/shared/statusTone';

/**
 * Live snapshot of the AI Analytics module's mock detection data, embedded
 * on the Dashboard so AI activity is visible without navigating away.
 * Mirrors the LiveMonitoringWidget / AccessControlLiveWidget pattern.
 */
export function AIAnalyticsLiveWidget() {
  const navigate = useNavigate();

  const totalDetections =
    faceRecognitionEvents.length + personDetectionEvents.length + vehicleDetectionEvents.length + intrusionEvents.length;
  const activeAlerts = aiAlerts.filter((a) => a.status === 'active').length;
  const preview = aiAlerts.slice(0, 4);

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <div className="flex items-center gap-2">
          <AppCardTitle>AI Analytics</AppCardTitle>
          <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
            <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
            Live
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.aiAnalytics)}>
          View all
          <ArrowRight className="size-3.5" />
        </Button>
      </AppCardHeader>

      <AppCardContent className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => navigate(ROUTES.aiAnalytics)}
            className="flex flex-col items-center gap-1 rounded-(--radius-md) border border-border-default bg-surface-raised px-3 py-2 text-center transition-colors hover:border-border-strong hover:bg-surface-hover"
          >
            <span className="flex items-center gap-1 text-[10.5px] uppercase tracking-wide text-text-tertiary">
              <BrainCircuit className="size-3" /> Detections
            </span>
            <span className="text-base font-semibold tabular-nums text-text-primary">{totalDetections}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`${ROUTES.aiAnalytics}/${AI_ANALYTICS_PATHS.alerts}`)}
            className="flex flex-col items-center gap-1 rounded-(--radius-md) border border-danger-500/30 bg-danger-bg px-3 py-2 text-center transition-colors hover:bg-danger-bg/80"
          >
            <span className="flex items-center gap-1 text-[10.5px] uppercase tracking-wide text-danger-400">
              <BellRing className="size-3" /> Active Alerts
            </span>
            <span className="text-base font-semibold tabular-nums text-danger-400">{activeAlerts}</span>
          </button>
        </div>

        <ul className="flex-1 divide-y divide-border-default overflow-hidden rounded-(--radius-md) border border-border-default">
          {preview.map((alert) => (
            <li key={alert.id} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-text-primary">{alert.alertType}</p>
                <p className="truncate text-[10.5px] text-text-tertiary">{alert.location}</p>
              </div>
              <StatusBadge tone={SEVERITY_TONE[alert.severity]} className="shrink-0 px-1.5 py-0">
                {alert.severity}
              </StatusBadge>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => navigate(`${ROUTES.aiAnalytics}/${AI_ANALYTICS_PATHS.faceRecognition}`)}
          className="flex items-center justify-between gap-2 rounded-(--radius-md) border border-border-default px-3 py-2 text-left transition-colors hover:border-border-strong hover:bg-surface-hover"
        >
          <span className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <ScanFace className="size-3.5" /> Face Recognition Events
          </span>
          <span className="text-[12px] font-semibold tabular-nums text-text-primary">{faceRecognitionEvents.length}</span>
        </button>
      </AppCardContent>
    </AppCard>
  );
}
