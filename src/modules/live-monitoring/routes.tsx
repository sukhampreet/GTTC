import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { LiveMonitoringLayout } from '@/modules/live-monitoring/layout/LiveMonitoringLayout';
import { LIVE_MONITORING_PATHS } from '@/modules/live-monitoring/constants/paths';

import { LiveMonitoringHomePage } from '@/modules/live-monitoring/pages/LiveMonitoringHomePage';
import { CameraWallPage } from '@/modules/live-monitoring/pages/CameraWallPage';
import { LiveEventsPage } from '@/modules/live-monitoring/pages/LiveEventsPage';
import { LiveAlertsPage } from '@/modules/live-monitoring/pages/LiveAlertsPage';
import { BuildingStatusPage } from '@/modules/live-monitoring/pages/BuildingStatusPage';
import { DeviceStatusPage } from '@/modules/live-monitoring/pages/DeviceStatusPage';
import { LiveParkingStatusPage } from '@/modules/live-monitoring/pages/LiveParkingStatusPage';
import { LiveAccessStatusPage } from '@/modules/live-monitoring/pages/LiveAccessStatusPage';
import { LiveFireStatusPage } from '@/modules/live-monitoring/pages/LiveFireStatusPage';
import { LiveEnvironmentStatusPage } from '@/modules/live-monitoring/pages/LiveEnvironmentStatusPage';
import { CampusOverviewPage } from '@/modules/live-monitoring/pages/CampusOverviewPage';

/**
 * Sprint 3 — Live Monitoring module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>, the same
 * "minimal registration" pattern already used for Access Control.
 */
export const liveMonitoringRoutes = (
  <Route key="live-monitoring" path={ROUTES.liveMonitoring} element={<LiveMonitoringLayout />}>
    <Route index element={<LiveMonitoringHomePage />} />
    <Route path={LIVE_MONITORING_PATHS.cameraWall} element={<CameraWallPage />} />
    <Route path={LIVE_MONITORING_PATHS.events} element={<LiveEventsPage />} />
    <Route path={LIVE_MONITORING_PATHS.alerts} element={<LiveAlertsPage />} />
    <Route path={LIVE_MONITORING_PATHS.buildings} element={<BuildingStatusPage />} />
    <Route path={LIVE_MONITORING_PATHS.devices} element={<DeviceStatusPage />} />
    <Route path={LIVE_MONITORING_PATHS.parking} element={<LiveParkingStatusPage />} />
    <Route path={LIVE_MONITORING_PATHS.access} element={<LiveAccessStatusPage />} />
    <Route path={LIVE_MONITORING_PATHS.fire} element={<LiveFireStatusPage />} />
    <Route path={LIVE_MONITORING_PATHS.environment} element={<LiveEnvironmentStatusPage />} />
    <Route path={LIVE_MONITORING_PATHS.campus} element={<CampusOverviewPage />} />
  </Route>
);
