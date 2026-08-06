import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { LoginPage } from '@/pages/auth/LoginPage';
import { NotFoundPage } from '@/pages/errors/NotFoundPage';
import { AccessDeniedPage } from '@/pages/errors/AccessDeniedPage';
import { PlaceholderPage } from '@/pages/placeholder/PlaceholderPage';
import { ROUTES } from '@/constants/routes';

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
        {MODULE_ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={<PlaceholderPage title={route.title} />} />
        ))}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
