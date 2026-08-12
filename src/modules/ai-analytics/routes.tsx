import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AIAnalyticsLayout } from '@/modules/ai-analytics/layout/AIAnalyticsLayout';
import { AI_ANALYTICS_PATHS } from '@/modules/ai-analytics/constants/paths';

import { AIAnalyticsHomePage } from '@/modules/ai-analytics/pages/AIAnalyticsHomePage';
import { FaceRecognitionPage } from '@/modules/ai-analytics/pages/FaceRecognitionPage';
import { PersonDetectionPage } from '@/modules/ai-analytics/pages/PersonDetectionPage';
import { VehicleDetectionPage } from '@/modules/ai-analytics/pages/VehicleDetectionPage';
import { IntrusionDetectionPage } from '@/modules/ai-analytics/pages/IntrusionDetectionPage';
import { LineCrossingPage } from '@/modules/ai-analytics/pages/LineCrossingPage';
import { CrowdDetectionPage } from '@/modules/ai-analytics/pages/CrowdDetectionPage';
import { PPEDetectionPage } from '@/modules/ai-analytics/pages/PPEDetectionPage';
import { BehaviorAnalysisPage } from '@/modules/ai-analytics/pages/BehaviorAnalysisPage';
import { HeatMapsPage } from '@/modules/ai-analytics/pages/HeatMapsPage';
import { AIAlertsPage } from '@/modules/ai-analytics/pages/AIAlertsPage';
import { AIReportsPage } from '@/modules/ai-analytics/pages/AIReportsPage';
import { AIModelManagerPage } from '@/modules/ai-analytics/pages/AIModelManagerPage';

/**
 * Sprint 10 — AI Analytics module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>, mirroring the
 * fire-emergency / live-monitoring module pattern.
 */
export const aiAnalyticsRoutes = (
  <Route key="ai-analytics" path={ROUTES.aiAnalytics} element={<AIAnalyticsLayout />}>
    <Route index element={<AIAnalyticsHomePage />} />
    <Route path={AI_ANALYTICS_PATHS.faceRecognition} element={<FaceRecognitionPage />} />
    <Route path={AI_ANALYTICS_PATHS.personDetection} element={<PersonDetectionPage />} />
    <Route path={AI_ANALYTICS_PATHS.vehicleDetection} element={<VehicleDetectionPage />} />
    <Route path={AI_ANALYTICS_PATHS.intrusionDetection} element={<IntrusionDetectionPage />} />
    <Route path={AI_ANALYTICS_PATHS.lineCrossing} element={<LineCrossingPage />} />
    <Route path={AI_ANALYTICS_PATHS.crowdDetection} element={<CrowdDetectionPage />} />
    <Route path={AI_ANALYTICS_PATHS.ppeDetection} element={<PPEDetectionPage />} />
    <Route path={AI_ANALYTICS_PATHS.behaviorAnalysis} element={<BehaviorAnalysisPage />} />
    <Route path={AI_ANALYTICS_PATHS.heatMaps} element={<HeatMapsPage />} />
    <Route path={AI_ANALYTICS_PATHS.alerts} element={<AIAlertsPage />} />
    <Route path={AI_ANALYTICS_PATHS.reports} element={<AIReportsPage />} />
    <Route path={AI_ANALYTICS_PATHS.modelManager} element={<AIModelManagerPage />} />
  </Route>
);
