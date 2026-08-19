import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addCamera,
  listCameras,
  removeCamera,
  type BackendCameraSummary,
  type CameraCreatePayload,
} from '@/lib/api/cameraApi';
import { cameraRecords as staticCameraRecords } from '@/modules/video-surveillance/mock';
import type { CameraRecord } from '@/modules/video-surveillance/types';

/**
 * Single shared source of truth for "which of our 8 NVR channels has a real
 * backend camera on it right now". Live View, the Dashboard widget, and the
 * Camera Configuration "Add IP Cam" screen all read through this hook
 * instead of each fetching/merging the backend registry themselves.
 */
export const CAMERA_REGISTRY_QUERY_KEY = ['backend-camera-registry'] as const;

export const MIN_CHANNEL = 1;
export const MAX_CHANNEL = 8;
const ALL_CHANNELS = Array.from({ length: MAX_CHANNEL - MIN_CHANNEL + 1 }, (_, i) => i + MIN_CHANNEL);

function channelFromLocation(location: string): number | null {
  const match = /Channel (\d+)/.exec(location);
  return match ? Number(match[1]) : null;
}

/** Best-known "is it up" reading for a registered channel — the tile itself
 * (CameraTile → LiveCameraPlayer) drives its own live badge once mounted;
 * this is only used for the aggregate stat cards / list rows. */
function mergeCamera(slot: CameraRecord, backend: BackendCameraSummary | undefined): CameraRecord {
  if (!backend) return slot;
  const online = backend.status === 'online';
  return {
    ...slot,
    id: backend.id,
    name: backend.name,
    ipAddress: 'Managed by backend',
    status: online ? 'online' : 'warning',
    health: online ? 'success' : backend.status === 'error' ? 'danger' : 'warning',
    firmware: backend.nvrModel,
    group: 'CP PLUS (Live)',
    liveCameraId: backend.id,
  };
}

export interface UseCameraRegistryResult {
  /** The fixed 8-channel slot list, merged with whatever the backend currently has registered. */
  cameras: CameraRecord[];
  /** Raw backend camera summaries, as returned by GET /api/cameras. */
  backendCameras: BackendCameraSummary[];
  /** Channels 2-8 with no backend camera registered yet — channel 1 is never offered (always taken). */
  availableChannels: number[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

export function useCameraRegistry(): UseCameraRegistryResult {
  const query = useQuery({
    queryKey: CAMERA_REGISTRY_QUERY_KEY,
    queryFn: () => listCameras(),
    staleTime: 15_000,
  });

  const backendCameras = useMemo(() => query.data?.cameras ?? [], [query.data]);

  const cameras = useMemo(() => {
    const byChannel = new Map(backendCameras.map((c) => [c.channel, c]));
    return staticCameraRecords.map((slot) => {
      const channel = channelFromLocation(slot.location);
      return mergeCamera(slot, channel ? byChannel.get(channel) : undefined);
    });
  }, [backendCameras]);

  const availableChannels = useMemo(() => {
    const taken = new Set(backendCameras.map((c) => c.channel));
    return ALL_CHANNELS.filter((ch) => ch !== MIN_CHANNEL && !taken.has(ch));
  }, [backendCameras]);

  return {
    cameras,
    backendCameras,
    availableChannels,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: () => void query.refetch(),
  };
}

/** Adds a camera, then refreshes the shared registry so every consumer
 * (Live View, Dashboard, this screen) picks up the new channel immediately. */
export function useAddCameraMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CameraCreatePayload) => addCamera(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CAMERA_REGISTRY_QUERY_KEY });
    },
  });
}

/** Removes a camera (backend stops its stream first), then refreshes the shared registry. */
export function useRemoveCameraMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cameraId: string) => removeCamera(cameraId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CAMERA_REGISTRY_QUERY_KEY });
    },
  });
}
