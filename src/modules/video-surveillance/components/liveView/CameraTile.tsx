import { useState } from 'react';
import { Camera, Circle, Expand, Move3d, VideoOff, Wifi, WifiOff } from 'lucide-react';

import { cn } from '@/utils/cn';
import type { CameraRecord } from '@/modules/video-surveillance/types';
import { LiveCameraPlayer } from '@/components/media/LiveCameraPlayer';
import type { BackendStreamStatus } from '@/lib/api/cameraApi';

export interface CameraTileProps {
  camera: CameraRecord;
  dense?: boolean;
  onSnapshot?: (camera: CameraRecord) => void;
  onFullscreen?: (camera: CameraRecord) => void;
}

export function CameraTile({ camera, dense = false, onSnapshot, onFullscreen }: CameraTileProps) {
  // For the real backend camera, let the live player's actual connection
  // state drive the badge/icon instead of the static mock `status` field —
  // "starting" must read as connecting, never "offline" (see API_CONTRACT.md).
  const [liveStatus, setLiveStatus] = useState<BackendStreamStatus>('starting');
  const isLive = Boolean(camera.liveCameraId);
  const offline = isLive ? liveStatus === 'offline' || liveStatus === 'error' : camera.status === 'offline';

  return (
    <div className="group relative flex aspect-video flex-col justify-between overflow-hidden rounded-(--radius-md) border border-border-default bg-[repeating-linear-gradient(135deg,#0b0e14,#0b0e14_10px,#11151d_10px,#11151d_20px)]">
      {isLive ? (
        <LiveCameraPlayer
          cameraId={camera.liveCameraId!}
          className="absolute inset-0"
          onStatusChange={setLiveStatus}
        />
      ) : (
        // Video placeholder area — mock cameras have no streaming backend.
        <div className="absolute inset-0 flex items-center justify-center">
          {offline ? (
            <VideoOff className="size-6 text-white/15" />
          ) : (
            <Camera className="size-6 text-white/10" />
          )}
        </div>
      )}

      <div className="relative flex items-center justify-between gap-1 p-1.5">
        <div className="flex min-w-0 items-center gap-1">
          {offline ? (
            <WifiOff className="size-3 shrink-0 text-danger-400" />
          ) : (
            <Wifi className="size-3 shrink-0 text-success-400" />
          )}
          <span className={cn('truncate font-medium text-white/90', dense ? 'text-[9px]' : 'text-[11px]')}>{camera.name}</span>
        </div>
        {camera.aiEnabled && !dense && (
          <span className="shrink-0 rounded-sm bg-primary-500/20 px-1 py-0.5 text-[9px] font-medium text-primary-300">AI</span>
        )}
      </div>

      <div className="relative flex items-end justify-between gap-1 p-1.5">
        <div className="flex flex-col gap-0.5">
          {camera.recording && !offline && (
            <span className="flex items-center gap-1 rounded-sm bg-black/60 px-1 py-0.5 text-[9px] font-medium text-danger-400">
              <Circle className="size-1.5 fill-current" />
              REC
            </span>
          )}
          {!dense && <span className="text-[9px] text-white/50">{camera.resolution} · {camera.streamQuality}</span>}
        </div>
        {!offline && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {camera.hasPtz && (
              <button
                type="button"
                title="PTZ Control"
                className="rounded-sm bg-black/60 p-1 text-white/80 hover:text-white"
              >
                <Move3d className="size-3" />
              </button>
            )}
            <button
              type="button"
              title="Snapshot"
              onClick={() => onSnapshot?.(camera)}
              className="rounded-sm bg-black/60 p-1 text-white/80 hover:text-white"
            >
              <Camera className="size-3" />
            </button>
            <button
              type="button"
              title="Fullscreen"
              onClick={() => onFullscreen?.(camera)}
              className="rounded-sm bg-black/60 p-1 text-white/80 hover:text-white"
            >
              <Expand className="size-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
