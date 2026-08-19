import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { VIDEO_SURVEILLANCE_PATHS } from '@/modules/video-surveillance/constants/paths';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/video-surveillance/components/shared/statusTone';
import { CameraGrid } from '@/modules/video-surveillance/components/liveView/CameraGrid';
import { useCameraRegistry } from '@/modules/video-surveillance/hooks/useCameraRegistry';

/**
 * Live snapshot of the Video Surveillance module's camera feed, embedded
 * directly on the Dashboard so the module's "live" view is visible without
 * navigating away. Backed by the same mock camera inventory the full Live
 * View page renders — not a separate/disconnected placeholder — and every
 * entry point here routes into the real Live View page.
 */
export function VideoSurveillanceLiveWidget() {
  const navigate = useNavigate();
  const { cameras } = useCameraRegistry();

  const onlineCameras = cameras.filter((c) => c.status === 'online').length;
  const recordingCameras = cameras.filter((c) => c.recording).length;
  const preview = cameras.slice(0, 3);

  function goToLiveView() {
    navigate(`${ROUTES.videoSurveillance}/${VIDEO_SURVEILLANCE_PATHS.liveView}`);
  }

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <div className="flex items-center gap-2">
          <AppCardTitle>Video Surveillance — Live View</AppCardTitle>
          <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
            <span className="size-1.5 animate-pulse rounded-full bg-success-500" />
            Live
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={goToLiveView}>
          Open Live View
          <ArrowRight className="size-3.5" />
        </Button>
      </AppCardHeader>

      <AppCardContent className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-text-tertiary">Total Cameras</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-text-primary">{cameras.length}</p>
          </div>
          <div className="rounded-(--radius-md) border border-success-500/30 bg-success-bg px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-success-400">Online</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-success-400">{onlineCameras}</p>
          </div>
          <div className="rounded-(--radius-md) border border-info-500/30 bg-info-bg px-3 py-2 text-center">
            <p className="text-[10.5px] uppercase tracking-wide text-info-400">Recording</p>
            <p className="mt-0.5 text-base font-semibold tabular-nums text-info-400">{recordingCameras}</p>
          </div>
        </div>

        <div className="max-h-56 overflow-y-auto">
          <CameraGrid cameras={cameras} layout={8} />
        </div>

        <ul className="divide-y divide-border-default overflow-hidden rounded-(--radius-md) border border-border-default">
          {preview.map((camera) => (
            <li key={camera.id} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <Camera className={cn('size-3.5 shrink-0', camera.status === 'online' ? 'text-text-tertiary' : 'text-danger-400')} />
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{camera.name}</p>
                  <p className="truncate text-[10.5px] text-text-tertiary">{camera.building}</p>
                </div>
              </div>
              <StatusBadge tone={DEVICE_STATUS_TONE[camera.status]} className="px-1.5 py-0">
                {DEVICE_STATUS_LABEL[camera.status]}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
