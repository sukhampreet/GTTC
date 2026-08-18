/**
 * Backend API configuration.
 *
 * The GTTC frontend talks ONLY to the FastAPI backend (see
 * `backend/API_CONTRACT.md`) — it never connects directly to the CP PLUS
 * NVR, and never contains RTSP URLs or NVR credentials.
 */

/** Base URL of the FastAPI backend, e.g. `http://localhost:8000`. */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, '') || 'http://localhost:8000';

/** The only real, physically-wired camera as of Stage 2 (CP PLUS NVR channel 1). */
export const REAL_CAMERA_ID = 'CAM-CPPLUS-001';
