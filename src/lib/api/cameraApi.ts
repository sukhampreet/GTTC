import { API_BASE_URL } from '@/config/api';

/**
 * Types mirror `backend/API_CONTRACT.md` exactly. Do not invent fields the
 * backend doesn't return, and do not rename fields to match frontend
 * conventions — keep this file a thin, faithful client for that contract.
 */

export type BackendStreamStatus = 'starting' | 'online' | 'offline' | 'error';

export interface BackendCameraSummary {
  id: string;
  name: string;
  channel: number;
  nvrModel: string;
  status: BackendStreamStatus;
  protocol: string;
  verified: boolean;
}

export interface BackendCameraDetail extends BackendCameraSummary {
  nvrIp: string;
  streamType: string;
}

export interface BackendCameraStatus {
  cameraId: string;
  status: BackendStreamStatus;
  detail: string | null;
}

export interface BackendCameraStream {
  cameraId: string;
  streamType: 'hls';
  streamUrl: string;
  status: BackendStreamStatus;
}

export class CameraApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'CameraApiError';
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new CameraApiError('Unable to reach the backend. Is it running?');
  }

  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { detail?: string };
      if (body?.detail) detail = body.detail;
    } catch {
      // non-JSON error body — keep the generic message
    }
    throw new CameraApiError(detail, response.status);
  }

  return (await response.json()) as T;
}

export function getCameras(): Promise<{ cameras: BackendCameraSummary[] }> {
  return request('/api/cameras');
}

export function getCamera(cameraId: string): Promise<BackendCameraDetail> {
  return request(`/api/cameras/${encodeURIComponent(cameraId)}`);
}

export function getCameraStatus(cameraId: string): Promise<BackendCameraStatus> {
  return request(`/api/cameras/${encodeURIComponent(cameraId)}/status`);
}

/** Starts the stream (lazily, backend-side) and returns the HLS URL to play. */
export function getCameraStream(cameraId: string): Promise<BackendCameraStream> {
  return request(`/api/cameras/${encodeURIComponent(cameraId)}/stream`);
}

/** Prefixes a relative `streamUrl` (e.g. `/api/streams/CAM-.../index.m3u8`) with the backend base URL. */
export function resolveStreamUrl(streamUrl: string): string {
  return `${API_BASE_URL}${streamUrl}`;
}
