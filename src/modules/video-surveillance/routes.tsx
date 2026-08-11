import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { VideoSurveillanceLayout } from '@/modules/video-surveillance/layout/VideoSurveillanceLayout';
import { VIDEO_SURVEILLANCE_PATHS, AI_DETECTION_PATHS } from '@/modules/video-surveillance/constants/paths';

import { VideoSurveillanceHomePage } from '@/modules/video-surveillance/pages/VideoSurveillanceHomePage';
import { LiveViewPage } from '@/modules/video-surveillance/pages/LiveViewPage';
import { PlaybackPage } from '@/modules/video-surveillance/pages/PlaybackPage';
import { CameraListPage } from '@/modules/video-surveillance/pages/CameraListPage';
import { CameraHealthPage } from '@/modules/video-surveillance/pages/CameraHealthPage';
import { RecordingPage } from '@/modules/video-surveillance/pages/RecordingPage';
import { SnapshotsPage } from '@/modules/video-surveillance/pages/SnapshotsPage';
import { PTZControlPage } from '@/modules/video-surveillance/pages/PTZControlPage';
import { RecordingSchedulePage } from '@/modules/video-surveillance/pages/RecordingSchedulePage';
import { CameraConfigurationPage } from '@/modules/video-surveillance/pages/CameraConfigurationPage';
import { VideoAnalyticsPage } from '@/modules/video-surveillance/pages/VideoAnalyticsPage';
import { AIDetectionPage } from '@/modules/video-surveillance/pages/AIDetectionPage';

import { PersonDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/PersonDetectionPage';
import { VehicleDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/VehicleDetectionPage';
import { FaceDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/FaceDetectionPage';
import { WeaponDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/WeaponDetectionPage';
import { FireDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/FireDetectionPage';
import { IntrusionDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/IntrusionDetectionPage';
import { CrowdDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/CrowdDetectionPage';
import { HelmetDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/HelmetDetectionPage';
import { PPEDetectionPage } from '@/modules/video-surveillance/pages/aiDetection/PPEDetectionPage';
import { LineCrossingPage } from '@/modules/video-surveillance/pages/aiDetection/LineCrossingPage';

/**
 * Sprint 3 — Video Surveillance module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>, mirroring the
 * Sprint 4 (Access Control) registration pattern — the only touch point
 * required in the shared routing file. Self-contained: no imports from
 * Sprint 2 (Dashboard) or Sprint 4 (Access Control) modules.
 */
export const videoSurveillanceRoutes = (
  <Route key="video-surveillance" path={ROUTES.videoSurveillance} element={<VideoSurveillanceLayout />}>
    <Route index element={<VideoSurveillanceHomePage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.liveView} element={<LiveViewPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.playback} element={<PlaybackPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.cameraList} element={<CameraListPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.cameraHealth} element={<CameraHealthPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.recording} element={<RecordingPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.snapshots} element={<SnapshotsPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.ptz} element={<PTZControlPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.schedule} element={<RecordingSchedulePage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.configuration} element={<CameraConfigurationPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.analytics} element={<VideoAnalyticsPage />} />
    <Route path={VIDEO_SURVEILLANCE_PATHS.aiDetection} element={<AIDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.person}`} element={<PersonDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.vehicle}`} element={<VehicleDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.face}`} element={<FaceDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.weapon}`} element={<WeaponDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.fire}`} element={<FireDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.intrusion}`} element={<IntrusionDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.crowd}`} element={<CrowdDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.helmet}`} element={<HelmetDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.ppe}`} element={<PPEDetectionPage />} />
    <Route path={`${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${AI_DETECTION_PATHS.lineCrossing}`} element={<LineCrossingPage />} />
  </Route>
);
