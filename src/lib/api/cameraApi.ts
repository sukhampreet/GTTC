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

/** Body for POST /api/cameras. Mirrors backend CameraCreateRequest exactly. */
export interface CameraCreatePayload {
  name: string;
  channel: number;
  host: string;
  port: number;
  username: string;
  password: string;
  streamType: 'main' | 'sub';
}

export class CameraApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'CameraApiError';
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, init);
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

  // DELETE returns 204 No Content — no body to parse.
  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export function listCameras(): Promise<{ cameras: BackendCameraSummary[] }> {
  return request('/api/cameras');
}

/** Registers a new camera on an NVR channel (1-8) at runtime. 409 if that channel is already taken. */
export function addCamera(payload: CameraCreatePayload): Promise<BackendCameraDetail> {
  return request('/api/cameras', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

/** Stops the camera's running stream (backend-side) and removes it from the registry. */
export function removeCamera(cameraId: string): Promise<void> {
  return request(`/api/cameras/${encodeURIComponent(cameraId)}`, { method: 'DELETE' });
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
