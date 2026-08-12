import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { LoginPage } from '@/pages/auth/LoginPage';
import { NotFoundPage } from '@/pages/errors/NotFoundPage';
import { AccessDeniedPage } from '@/pages/errors/AccessDeniedPage';
import { PlaceholderPage } from '@/pages/placeholder/PlaceholderPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { ROUTES } from '@/constants/routes';
import { accessControlRoutes } from '@/modules/access-control/routes';
import { videoSurveillanceRoutes } from '@/modules/video-surveillance/routes';
import { userManagementRoutes } from '@/modules/user-management/routes';
import { settingsRoutes } from '@/modules/settings/routes';
import { buildingIntercomRoutes } from '@/modules/building-intercom/routes';
import { fireEmergencyRoutes } from '@/modules/fire-emergency/routes';
import { liveMonitoringRoutes } from '@/modules/live-monitoring/routes';
import { aiAnalyticsRoutes } from '@/modules/ai-analytics/routes';
import { reportsRoutes } from '@/modules/reports/routes';
import { eventCenterRoutes } from '@/modules/event-center/routes';
import { deviceManagementRoutes } from '@/modules/device-management/routes';
import { smartParkingRoutes } from '@/modules/smart-parking/routes';
import { environmentMonitoringRoutes } from '@/modules/environment-monitoring/routes';

const MODULE_ROUTES: { path: string; title: string }[] = [
  { path: ROUTES.dashboard, title: 'Dashboard' },
  { path: ROUTES.liveMonitoring, title: 'Live Monitoring' },
  { path: ROUTES.videoSurveillance, title: 'Video Surveillance' },
  { path: ROUTES.accessControl, title: 'Access Control' },
  { path: ROUTES.buildingIntercom, title: 'Building Intercom' },
  { path: ROUTES.fireEmergency, title: 'Fire & Emergency' },
  { path: ROUTES.smartParking, title: 'Smart Parking' },
  { path: ROUTES.environmentMonitoring, title: 'Environment Monitoring' },
  { path: ROUTES.eventCenter, title: 'Event Center' },
  { path: ROUTES.deviceManagement, title: 'Device Management' },
  { path: ROUTES.aiAnalytics, title: 'AI Analytics' },
  { path: ROUTES.reports, title: 'Reports' },
  { path: ROUTES.users, title: 'User Management' },
  { path: ROUTES.settings, title: 'Settings' },
];

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        {MODULE_ROUTES.filter(
          (route) =>
            route.path !== ROUTES.dashboard &&
            route.path !== ROUTES.liveMonitoring &&
            route.path !== ROUTES.accessControl &&
            route.path !== ROUTES.videoSurveillance &&
            route.path !== ROUTES.buildingIntercom &&
            route.path !== ROUTES.fireEmergency &&
            route.path !== ROUTES.aiAnalytics &&
            route.path !== ROUTES.reports &&
            route.path !== ROUTES.eventCenter &&
            route.path !== ROUTES.deviceManagement &&
            route.path !== ROUTES.smartParking &&
            route.path !== ROUTES.environmentMonitoring &&
            route.path !== ROUTES.users &&
            route.path !== ROUTES.settings,
        ).map((route) => (
          <Route key={route.path} path={route.path} element={<PlaceholderPage title={route.title} />} />
        ))}
        {liveMonitoringRoutes}
        {accessControlRoutes}
        {videoSurveillanceRoutes}
        {buildingIntercomRoutes}
        {fireEmergencyRoutes}
        {aiAnalyticsRoutes}
        {reportsRoutes}
        {eventCenterRoutes}
        {deviceManagementRoutes}
        {smartParkingRoutes}
        {environmentMonitoringRoutes}
        {userManagementRoutes}
        {settingsRoutes}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
