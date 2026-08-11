import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { FireEmergencyLayout } from '@/modules/fire-emergency/layout/FireEmergencyLayout';
import { FIRE_EMERGENCY_PATHS } from '@/modules/fire-emergency/constants/paths';

import { FireEmergencyHomePage } from '@/modules/fire-emergency/pages/FireEmergencyHomePage';
import { SmokeDetectionPage } from '@/modules/fire-emergency/pages/SmokeDetectionPage';
import { HeatDetectionPage } from '@/modules/fire-emergency/pages/HeatDetectionPage';
import { ManualCallPointPage } from '@/modules/fire-emergency/pages/ManualCallPointPage';
import { AlarmHistoryPage } from '@/modules/fire-emergency/pages/AlarmHistoryPage';
import { EmergencyBroadcastPage } from '@/modules/fire-emergency/pages/EmergencyBroadcastPage';
import { PaSystemPage } from '@/modules/fire-emergency/pages/PaSystemPage';
import { ZoneMonitoringPage } from '@/modules/fire-emergency/pages/ZoneMonitoringPage';
import { DeviceHealthPage } from '@/modules/fire-emergency/pages/DeviceHealthPage';
import { AlarmResetPage } from '@/modules/fire-emergency/pages/AlarmResetPage';
import { FaultMonitoringPage } from '@/modules/fire-emergency/pages/FaultMonitoringPage';
import { EventLogsPage } from '@/modules/fire-emergency/pages/EventLogsPage';
import { EmergencyResponsePage } from '@/modules/fire-emergency/pages/EmergencyResponsePage';

/**
 * Sprint 7 — Fire & Emergency module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>; this is the only
 * "minimal registration" touch point required in the shared routing file.
 */
export const fireEmergencyRoutes = (
  <Route key="fire-emergency" path={ROUTES.fireEmergency} element={<FireEmergencyLayout />}>
    <Route index element={<FireEmergencyHomePage />} />
    <Route path={FIRE_EMERGENCY_PATHS.smoke} element={<SmokeDetectionPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.heat} element={<HeatDetectionPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.mcp} element={<ManualCallPointPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.alarmHistory} element={<AlarmHistoryPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.broadcast} element={<EmergencyBroadcastPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.pa} element={<PaSystemPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.zones} element={<ZoneMonitoringPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.deviceHealth} element={<DeviceHealthPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.alarmReset} element={<AlarmResetPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.faults} element={<FaultMonitoringPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.eventLogs} element={<EventLogsPage />} />
    <Route path={FIRE_EMERGENCY_PATHS.emergencyResponse} element={<EmergencyResponsePage />} />
  </Route>
);
