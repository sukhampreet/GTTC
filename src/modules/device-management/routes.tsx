import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { DeviceManagementLayout } from '@/modules/device-management/layout/DeviceManagementLayout';
import { DEVICE_MANAGEMENT_PATHS } from '@/modules/device-management/constants/paths';

import { DeviceManagementHomePage } from '@/modules/device-management/pages/DeviceManagementHomePage';
import { DeviceInventoryPage } from '@/modules/device-management/pages/DeviceInventoryPage';
import { DeviceDetailsPage } from '@/modules/device-management/pages/DeviceDetailsPage';
import { DeviceHealthPage } from '@/modules/device-management/pages/DeviceHealthPage';
import { DeviceGroupsPage } from '@/modules/device-management/pages/DeviceGroupsPage';
import { DiagnosticsPage } from '@/modules/device-management/pages/DiagnosticsPage';
import { FirmwarePage } from '@/modules/device-management/pages/FirmwarePage';
import { MaintenancePage } from '@/modules/device-management/pages/MaintenancePage';
import { NetworkDevicesPage } from '@/modules/device-management/pages/NetworkDevicesPage';
import { DeviceEventsPage } from '@/modules/device-management/pages/DeviceEventsPage';

/**
 * Sprint 9/10 — Device Management module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>; this is the only
 * "minimal registration" touch point required in the shared routing file.
 */
export const deviceManagementRoutes = (
  <Route key="device-management" path={ROUTES.deviceManagement} element={<DeviceManagementLayout />}>
    <Route index element={<DeviceManagementHomePage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.inventory} element={<DeviceInventoryPage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.details} element={<DeviceDetailsPage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.health} element={<DeviceHealthPage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.groups} element={<DeviceGroupsPage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.diagnostics} element={<DiagnosticsPage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.firmware} element={<FirmwarePage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.maintenance} element={<MaintenancePage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.network} element={<NetworkDevicesPage />} />
    <Route path={DEVICE_MANAGEMENT_PATHS.events} element={<DeviceEventsPage />} />
  </Route>
);
