import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { EnvironmentMonitoringLayout } from '@/modules/environment-monitoring/layout/EnvironmentMonitoringLayout';
import { ENVIRONMENT_MONITORING_PATHS } from '@/modules/environment-monitoring/constants/paths';

import { EnvironmentMonitoringHomePage } from '@/modules/environment-monitoring/pages/EnvironmentMonitoringHomePage';
import { TemperaturePage } from '@/modules/environment-monitoring/pages/TemperaturePage';
import { HumidityPage } from '@/modules/environment-monitoring/pages/HumidityPage';
import { AirQualityPage } from '@/modules/environment-monitoring/pages/AirQualityPage';
import { OccupancyPage } from '@/modules/environment-monitoring/pages/OccupancyPage';
import { EnergyUsagePage } from '@/modules/environment-monitoring/pages/EnergyUsagePage';
import { LightingPage } from '@/modules/environment-monitoring/pages/LightingPage';
import { HVACPage } from '@/modules/environment-monitoring/pages/HVACPage';
import { AlertsPage } from '@/modules/environment-monitoring/pages/AlertsPage';
import { HistoricalGraphsPage } from '@/modules/environment-monitoring/pages/HistoricalGraphsPage';
import { DeviceStatusPage } from '@/modules/environment-monitoring/pages/DeviceStatusPage';

/**
 * Sprint 8 — Environment Monitoring module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>; this is the only
 * "minimal registration" touch point required in the shared routing file.
 */
export const environmentMonitoringRoutes = (
  <Route key="environment-monitoring" path={ROUTES.environmentMonitoring} element={<EnvironmentMonitoringLayout />}>
    <Route index element={<EnvironmentMonitoringHomePage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.temperature} element={<TemperaturePage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.humidity} element={<HumidityPage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.airQuality} element={<AirQualityPage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.occupancy} element={<OccupancyPage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.energyUsage} element={<EnergyUsagePage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.lighting} element={<LightingPage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.hvac} element={<HVACPage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.alerts} element={<AlertsPage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.historicalGraphs} element={<HistoricalGraphsPage />} />
    <Route path={ENVIRONMENT_MONITORING_PATHS.deviceStatus} element={<DeviceStatusPage />} />
  </Route>
);
