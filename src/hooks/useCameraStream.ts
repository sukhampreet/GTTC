import { useQuery } from '@tanstack/react-query';

import { getCameraStatus, getCameraStream, resolveStreamUrl, type BackendStreamStatus } from '@/lib/api/cameraApi';

export interface CameraStreamState {
  /** Best-known status: `starting` | `online` | `offline` | `error`. */
  status: BackendStreamStatus;
  /** Full, absolute HLS playlist URL — ready to hand to hls.js — once known. */
  streamUrl: string | null;
  /** Human-readable detail, only ever populated for `error` (never contains credentials). */
  detail: string | null;
  /** True while the very first `/stream` request (the one that starts FFmpeg) is in flight. */
  isStarting: boolean;
}

/**
 * Starts (or reuses) the backend HLS stream for `cameraId` and polls its
 * status at a modest interval so the UI can reflect starting/online/offline
 * without depending solely on hls.js error events.
 *
 * Calling this hook is safe to do from multiple mounted players for the
 * same camera — per API_CONTRACT.md, `/stream` is idempotent server-side
 * and never spawns a second FFmpeg process.
 */
export function useCameraStream(cameraId: string, enabled: boolean = true): CameraStreamState {
  const streamQuery = useQuery({
    queryKey: ['camera-stream', cameraId],
    queryFn: () => getCameraStream(cameraId),
    enabled,
    staleTime: Infinity,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const statusQuery = useQuery({
    queryKey: ['camera-status', cameraId],
    queryFn: () => getCameraStatus(cameraId),
    enabled: enabled && streamQuery.isSuccess,
    // Poll a bit faster while not yet live, then settle into a light cadence.
    refetchInterval: (query) => (query.state.data?.status === 'online' ? 10_000 : 3_000),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (streamQuery.isError) {
    return {
      status: 'error',
      streamUrl: null,
      detail: streamQuery.error instanceof Error ? streamQuery.error.message : 'Unable to reach the backend.',
      isStarting: false,
    };
  }

  const status = statusQuery.data?.status ?? streamQuery.data?.status ?? 'starting';
  const streamUrl = streamQuery.data ? resolveStreamUrl(streamQuery.data.streamUrl) : null;

  return {
    status,
    streamUrl,
    detail: status === 'error' ? statusQuery.data?.detail ?? null : null,
    isStarting: streamQuery.isPending,
  };
}
