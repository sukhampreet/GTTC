import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AccessControlLayout } from '@/modules/access-control/layout/AccessControlLayout';
import { ACCESS_CONTROL_PATHS } from '@/modules/access-control/constants/paths';

import { AccessControlHomePage } from '@/modules/access-control/pages/AccessControlHomePage';
import { LiveDoorStatusPage } from '@/modules/access-control/pages/LiveDoorStatusPage';
import { AccessLogsPage } from '@/modules/access-control/pages/AccessLogsPage';
import { FaceManagementPage } from '@/modules/access-control/pages/FaceManagementPage';
import { CardManagementPage } from '@/modules/access-control/pages/CardManagementPage';
import { VisitorManagementPage } from '@/modules/access-control/pages/VisitorManagementPage';
import { EmployeeManagementPage } from '@/modules/access-control/pages/EmployeeManagementPage';
import { DoorControlPage } from '@/modules/access-control/pages/DoorControlPage';
import { AttendancePage } from '@/modules/access-control/pages/AttendancePage';
import { TimeSchedulePage } from '@/modules/access-control/pages/TimeSchedulePage';
import { AccessPermissionsPage } from '@/modules/access-control/pages/AccessPermissionsPage';
import { AntiPassbackPage } from '@/modules/access-control/pages/AntiPassbackPage';
import { BlacklistPage } from '@/modules/access-control/pages/BlacklistPage';
import { EmergencyUnlockPage } from '@/modules/access-control/pages/EmergencyUnlockPage';
import { DeviceConfigurationPage } from '@/modules/access-control/pages/DeviceConfigurationPage';

/**
 * Sprint 4 — Access Control module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>; this is the only
 * "minimal registration" touch point required in the shared routing file.
 */
export const accessControlRoutes = (
  <Route key="access-control" path={ROUTES.accessControl} element={<AccessControlLayout />}>
    <Route index element={<AccessControlHomePage />} />
    <Route path={ACCESS_CONTROL_PATHS.doorStatus} element={<LiveDoorStatusPage />} />
    <Route path={ACCESS_CONTROL_PATHS.logs} element={<AccessLogsPage />} />
    <Route path={ACCESS_CONTROL_PATHS.faces} element={<FaceManagementPage />} />
    <Route path={ACCESS_CONTROL_PATHS.cards} element={<CardManagementPage />} />
    <Route path={ACCESS_CONTROL_PATHS.visitors} element={<VisitorManagementPage />} />
    <Route path={ACCESS_CONTROL_PATHS.employees} element={<EmployeeManagementPage />} />
    <Route path={ACCESS_CONTROL_PATHS.doorControl} element={<DoorControlPage />} />
    <Route path={ACCESS_CONTROL_PATHS.attendance} element={<AttendancePage />} />
    <Route path={ACCESS_CONTROL_PATHS.schedule} element={<TimeSchedulePage />} />
    <Route path={ACCESS_CONTROL_PATHS.permissions} element={<AccessPermissionsPage />} />
    <Route path={ACCESS_CONTROL_PATHS.antiPassback} element={<AntiPassbackPage />} />
    <Route path={ACCESS_CONTROL_PATHS.blacklist} element={<BlacklistPage />} />
    <Route path={ACCESS_CONTROL_PATHS.emergency} element={<EmergencyUnlockPage />} />
    <Route path={ACCESS_CONTROL_PATHS.devices} element={<DeviceConfigurationPage />} />
  </Route>
);
