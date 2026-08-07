import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, BellRing, Siren } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ROUTES } from '@/constants/routes';
import { liveCameras } from '@/modules/live-monitoring/mock/liveCameras';
import { liveAlerts } from '@/modules/live-monitoring/mock/alerts';
import { liveEvents } from '@/modules/live-monitoring/mock/liveEvents';
import { LIVE_MONITORING_PATHS } from '@/modules/live-monitoring/constants/paths';
import { EVENT_STATUS_LABEL, EVENT_STATUS_TONE } from '@/modules/live-monitoring/components/shared/statusTone';

/**
 * Live snapshot of the Live Monitoring module's real SOC data, embedded
 * directly on the Dashboard so the module's "live" view is visible without
 * navigating away. Backed by the same mock data the full Live Monitoring
 * Home / Live Events pages render — not a separate/disconnected placeholder —
 * so the two stay in sync. Mirrors the AccessControlLiveWidget pattern.
 */
export function LiveMonitoringWidget() {
  const navigate = useNavigate();

  const onlineCameras = liveCameras.filter((c) => c.status === 'online').length;
  const activeAlerts = liveAlerts.filter((a) => !a.acknowledged).length;
  const emergencyEvents = liveEvents.filter((e) => e.priority === 'danger' && e.status === 'new').length;
  const preview = liveEvents.slice(0, 5);

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <div className="flex items-center gap-2">
          <AppCardTitle>Live Monitoring — Security Operations Center</AppCardTitle>
          <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
            <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
            Live
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.liveMonitoring)}>
          View all
          <ArrowRight className="size-3.5" />
        </Button>
      </AppCardHeader>

      <AppCardContent className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => navigate(`${ROUTES.liveMonitoring}/${LIVE_MONITORING_PATHS.cameraWall}`)}
            className="flex flex-col items-center gap-1 rounded-(--radius-md) border border-border-default bg-surface-raised px-3 py-2 text-center transition-colors hover:border-border-strong hover:bg-surface-hover"
          >
            <span className="flex items-center gap-1 text-[10.5px] uppercase tracking-wide text-text-tertiary">
              <Camera className="size-3" /> Cameras Online
            </span>
            <span className="text-base font-semibold tabular-nums text-text-primary">
              {onlineCameras}/{liveCameras.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`${ROUTES.liveMonitoring}/${LIVE_MONITORING_PATHS.alerts}`)}
            className="flex flex-col items-center gap-1 rounded-(--radius-md) border border-warning-500/30 bg-warning-bg px-3 py-2 text-center transition-colors hover:bg-warning-bg/80"
          >
            <span className="flex items-center gap-1 text-[10.5px] uppercase tracking-wide text-warning-400">
              <BellRing className="size-3" /> Active Alerts
            </span>
            <span className="text-base font-semibold tabular-nums text-warning-400">{activeAlerts}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`${ROUTES.liveMonitoring}/${LIVE_MONITORING_PATHS.events}`)}
            className="flex flex-col items-center gap-1 rounded-(--radius-md) border border-danger-500/30 bg-danger-bg px-3 py-2 text-center transition-colors hover:bg-danger-bg/80"
          >
            <span className="flex items-center gap-1 text-[10.5px] uppercase tracking-wide text-danger-400">
              <Siren className="size-3" /> Emergency Events
            </span>
            <span className="text-base font-semibold tabular-nums text-danger-400">{emergencyEvents}</span>
          </button>
        </div>

        <ul className="flex-1 divide-y divide-border-default overflow-hidden rounded-(--radius-md) border border-border-default">
          {preview.map((event) => (
            <li key={event.id} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-text-primary">{event.type}</p>
                <p className="truncate text-[10.5px] text-text-tertiary">{event.location} · {event.timestamp}</p>
              </div>
              <StatusBadge tone={EVENT_STATUS_TONE[event.status]} className="shrink-0 px-1.5 py-0">
                {EVENT_STATUS_LABEL[event.status]}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
