import { Maximize2, Camera, CircleDot, BrainCircuit, Aperture } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import type { LiveCameraTile } from '@/modules/live-monitoring/types';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/live-monitoring/components/shared/statusTone';

export interface CameraCardProps {
  camera: LiveCameraTile;
  compact?: boolean;
}

/** Single CCTV wall tile — video placeholder only, no streaming implementation. */
export function CameraCard({ camera, compact = false }: CameraCardProps) {
  const isOffline = camera.status === 'offline';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-(--radius-md) border border-border-default bg-black">
      <div className="relative flex aspect-video items-center justify-center bg-[#0b0f14]">
        {isOffline ? (
          <div className="flex flex-col items-center gap-1.5 text-text-tertiary">
            <Camera className="size-6" />
            {!compact && <span className="text-[10.5px]">Signal Lost</span>}
          </div>
        ) : (
          <Camera className="size-6 text-white/15" />
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-1.5">
          <div className="flex items-center gap-1">
            {camera.recording && !isOffline && (
              <span className="flex items-center gap-1 rounded-(--radius-sm) bg-black/60 px-1.5 py-0.5 text-[9.5px] font-medium text-danger-400">
                <CircleDot className="size-2.5 animate-pulse" /> REC
              </span>
            )}
            {camera.aiEnabled && !isOffline && (
              <span className="flex items-center gap-1 rounded-(--radius-sm) bg-black/60 px-1.5 py-0.5 text-[9.5px] font-medium text-info-400">
                <BrainCircuit className="size-2.5" /> AI
              </span>
            )}
          </div>
          <span className="rounded-(--radius-sm) bg-black/60 px-1.5 py-0.5 font-mono text-[9.5px] text-white/70">
            {camera.resolution}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-1.5">
          <span className="rounded-(--radius-sm) bg-black/60 px-1.5 py-0.5 font-mono text-[9.5px] text-white/60">
            {camera.timestamp}
          </span>
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              className="rounded-(--radius-sm) bg-black/60 p-1 text-white/70 hover:text-white"
              aria-label="Snapshot"
            >
              <Aperture className="size-3" />
            </button>
            <button
              type="button"
              className="rounded-(--radius-sm) bg-black/60 p-1 text-white/70 hover:text-white"
              aria-label="Fullscreen"
            >
              <Maximize2 className="size-3" />
            </button>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="flex items-center justify-between gap-2 border-t border-white/5 bg-surface px-2 py-1.5">
          <div className="min-w-0">
            <p className="truncate text-[11.5px] font-medium text-text-primary">{camera.name}</p>
            <p className="truncate text-[10px] text-text-tertiary">{camera.building} · {camera.location}</p>
          </div>
          <StatusBadge tone={DEVICE_STATUS_TONE[camera.status]} className={cn('shrink-0 px-1.5 py-0')}>
            {DEVICE_STATUS_LABEL[camera.status]}
          </StatusBadge>
        </div>
      )}
    </div>
  );
}
