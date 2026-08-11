import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, CameraOff, Circle, Video, VideoOff } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { cameraRecords } from '@/modules/video-surveillance/mock';
import { VIDEO_SURVEILLANCE_PATHS } from '@/modules/video-surveillance/constants/paths';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/video-surveillance/components/shared/statusTone';

/**
 * Live snapshot of the Video Surveillance module's camera feed, embedded
 * directly on the Dashboard so the module's "live" view is visible without
 * navigating away. Backed by the same mock camera inventory the full Live
 * View page renders — not a separate/disconnected placeholder — and every
 * entry point here routes into the real Live View page.
 */
export function VideoSurveillanceLiveWidget() {
  const navigate = useNavigate();

  const onlineCameras = cameraRecords.filter((c) => c.status === 'online').length;
  const recordingCameras = cameraRecords.filter((c) => c.recording).length;
  const preview = cameraRecords.slice(0, 6);

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
            <p className="mt-0.5 text-base font-semibold tabular-nums text-text-primary">{cameraRecords.length}</p>
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

        <div className="grid flex-1 grid-cols-3 gap-2">
          {preview.map((camera) => (
            <button
              key={camera.id}
              type="button"
              onClick={goToLiveView}
              className="group relative flex aspect-video flex-col justify-between overflow-hidden rounded-(--radius-md) border border-border-default bg-black/80 p-1.5 text-left transition-colors hover:border-primary-500/60"
            >
              <div className="flex items-center justify-between">
                {camera.status === 'online' ? (
                  <Video className="size-3 text-white/70" />
                ) : (
                  <VideoOff className="size-3 text-white/40" />
                )}
                {camera.recording && camera.status === 'online' && (
                  <span className="flex items-center gap-1 rounded-sm bg-black/50 px-1 py-0.5 text-[9px] font-medium text-danger-400">
                    <Circle className="size-1.5 fill-current" />
                    REC
                  </span>
                )}
              </div>
              {camera.status !== 'online' && (
                <CameraOff className="absolute inset-0 m-auto size-4 text-white/20" />
              )}
              <p className="truncate text-[9.5px] font-medium text-white/80">{camera.name}</p>
            </button>
          ))}
        </div>

        <ul className="divide-y divide-border-default overflow-hidden rounded-(--radius-md) border border-border-default">
          {preview.slice(0, 3).map((camera) => (
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
