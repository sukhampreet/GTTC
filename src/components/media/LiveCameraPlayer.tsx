import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { AlertTriangle, Loader2 } from 'lucide-react';

import { cn } from '@/utils/cn';
import { useCameraStream } from '@/hooks/useCameraStream';
import type { BackendStreamStatus } from '@/lib/api/cameraApi';

export interface LiveCameraPlayerProps {
  /** Backend camera id, e.g. `CAM-CPPLUS-001`. See backend/API_CONTRACT.md. */
  cameraId: string;
  className?: string;
  /** Notifies the parent tile/card of the live status so it can sync its own badge/icon. */
  onStatusChange?: (status: BackendStreamStatus) => void;
  /** Show native browser video controls. Defaults to off to match the GTTC camera-tile chrome. */
  controls?: boolean;
}

const MAX_MANIFEST_RETRIES = 8;
const MANIFEST_RETRY_DELAY_MS = 1500;

/**
 * Plays the real CP PLUS HLS stream produced by the FastAPI backend.
 *
 * This is the ONE shared player used by Video Surveillance → Live View and
 * Live Monitoring → Camera Wall (and optionally a Dashboard preview) — per
 * Stage 2 requirements there must not be a second streaming implementation.
 *
 * It never talks to the CP PLUS NVR directly; it only ever requests URLs
 * under the FastAPI backend base URL (see `src/config/api.ts`).
 */
export function LiveCameraPlayer({ cameraId, className, onStatusChange, controls = false }: LiveCameraPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);

  const { status: apiStatus, streamUrl, detail, isStarting } = useCameraStream(cameraId);

  // playerStatus reflects what's actually happening in the <video> element,
  // which briefly lags the API's "online" (HLS needs a moment to attach and
  // buffer even after the manifest exists).
  const [playerStatus, setPlayerStatus] = useState<BackendStreamStatus>('starting');
  const [playerDetail, setPlayerDetail] = useState<string | null>(null);

  useEffect(() => {
    // Reset per-camera so switching cameras doesn't show stale state.
    retryCountRef.current = 0;
    setPlayerStatus('starting');
    setPlayerDetail(null);
  }, [cameraId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return undefined;

    function clearRetryTimer() {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }

    function scheduleManifestRetry(loadFn: () => void) {
      if (retryCountRef.current >= MAX_MANIFEST_RETRIES) {
        setPlayerStatus('error');
        setPlayerDetail('Stream did not become available in time.');
        return;
      }
      retryCountRef.current += 1;
      clearRetryTimer();
      retryTimeoutRef.current = setTimeout(loadFn, MANIFEST_RETRY_DELAY_MS);
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        // FFmpeg is still writing the first segments right after "starting" —
        // keep hls.js's own low-level retry loop, we only add manifest-level
        // retries below for the case it gives up entirely.
        manifestLoadingMaxRetry: 4,
        manifestLoadingRetryDelay: 1000,

        // --- Low-latency tuning ---------------------------------------
        // The backend now cuts ~1s segments (HLS_SEGMENT_SECONDS=1), so
        // hls.js can safely sit much closer to the live edge than its
        // defaults (which assume multi-second VOD-style segments).
        lowLatencyMode: true,
        // How many segments behind the live edge hls.js *targets* once
        // caught up (~2s of cushion at 1s segments). Small enough to keep
        // glass-to-glass latency low; not 0-1 because that leaves no
        // margin for normal segment-fetch jitter on Wi-Fi and would cause
        // frequent rebuffer stalls during the demo.
        liveSyncDurationCount: 2,
        // How many segments behind the edge hls.js will *tolerate* before
        // it seeks forward to catch back up (~4s). This is the ceiling on
        // worst-case staleness after a network hiccup, not the steady-state
        // target above.
        liveMaxLatencyDurationCount: 4,
        // Cap on how much media hls.js will buffer ahead (seconds). Kept
        // small so we're not sitting on stale-but-buffered segments (which
        // is itself added latency), but with enough headroom (~4s, matching
        // the max-latency ceiling above) to absorb ordinary Wi-Fi/LAN
        // jitter without stalling playback mid-demo.
        maxBufferLength: 4,
      });
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        retryCountRef.current = 0;
        setPlayerStatus('online');
        setPlayerDetail(null);
        video.play().catch(() => {
          // Autoplay can be blocked without user interaction; muted+playsInline
          // below covers the common cases, this is a harmless best-effort.
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;

        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // Manifest not ready yet (503/404) — expected right after "starting".
            scheduleManifestRetry(() => {
              hls.stopLoad();
              hls.loadSource(streamUrl);
              hls.startLoad();
            });
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;
          default:
            setPlayerStatus('error');
            setPlayerDetail('Playback failed.');
            hls.destroy();
            hlsRef.current = null;
        }
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      return () => {
        clearRetryTimer();
        hls.destroy();
        hlsRef.current = null;
      };
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari: native HLS support, no hls.js needed.
      video.src = streamUrl;
      const onLoadedMeta = () => {
        setPlayerStatus('online');
        setPlayerDetail(null);
        video.play().catch(() => {});
      };
      const onError = () => {
        scheduleManifestRetry(() => {
          video.src = streamUrl;
          video.load();
        });
      };
      video.addEventListener('loadedmetadata', onLoadedMeta);
      video.addEventListener('error', onError);
      return () => {
        clearRetryTimer();
        video.removeEventListener('loadedmetadata', onLoadedMeta);
        video.removeEventListener('error', onError);
        video.removeAttribute('src');
        video.load();
      };
    }

    setPlayerStatus('error');
    setPlayerDetail('This browser does not support HLS playback.');
    return undefined;
  }, [streamUrl, cameraId]);

  // Combine: API-reported errors always win; otherwise trust the player once
  // it has actually attached, and fall back to the API's starting/offline
  // reading before that.
  const effectiveStatus: BackendStreamStatus =
    apiStatus === 'error' || playerStatus === 'error'
      ? 'error'
      : playerStatus === 'online'
        ? 'online'
        : isStarting
          ? 'starting'
          : apiStatus;
  const effectiveDetail = apiStatus === 'error' ? detail : playerDetail;

  useEffect(() => {
    onStatusChange?.(effectiveStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveStatus]);

  return (
    <div className={cn('relative size-full overflow-hidden bg-black', className)}>
      <video
        ref={videoRef}
        className={cn('size-full object-cover', effectiveStatus !== 'online' && 'opacity-0')}
        autoPlay
        muted
        playsInline
        controls={controls}
      />

      {effectiveStatus !== 'online' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black text-white/70">
          {effectiveStatus === 'error' ? (
            <>
              <AlertTriangle className="size-5 text-danger-400" />
              <span className="px-2 text-center text-[10px] font-medium text-danger-400">
                {effectiveDetail ?? 'Stream unavailable'}
              </span>
            </>
          ) : (
            <>
              <Loader2 className="size-5 animate-spin text-white/40" />
              <span className="text-[10px] font-medium uppercase tracking-wide text-white/50">
                {effectiveStatus === 'offline' ? 'Offline' : 'Connecting…'}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
