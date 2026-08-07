import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { BuildingIntercomLayout } from '@/modules/building-intercom/layout/BuildingIntercomLayout';
import { BUILDING_INTERCOM_PATHS } from '@/modules/building-intercom/constants/paths';

import { BuildingIntercomHomePage } from '@/modules/building-intercom/pages/BuildingIntercomHomePage';
import { IndoorStationsPage } from '@/modules/building-intercom/pages/IndoorStationsPage';
import { OutdoorStationsPage } from '@/modules/building-intercom/pages/OutdoorStationsPage';
import { LiveCallsPage } from '@/modules/building-intercom/pages/LiveCallsPage';
import { CallHistoryPage } from '@/modules/building-intercom/pages/CallHistoryPage';
import { RemoteUnlockPage } from '@/modules/building-intercom/pages/RemoteUnlockPage';
import { VoiceBroadcastPage } from '@/modules/building-intercom/pages/VoiceBroadcastPage';
import { DeviceStatusPage } from '@/modules/building-intercom/pages/DeviceStatusPage';
import { RecordingPage } from '@/modules/building-intercom/pages/RecordingPage';
import { ConfigurationPage } from '@/modules/building-intercom/pages/ConfigurationPage';

/**
 * Sprint 5 — Building Intercom module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>; this is the only
 * "minimal registration" touch point required in the shared routing file.
 */
export const buildingIntercomRoutes = (
  <Route key="building-intercom" path={ROUTES.buildingIntercom} element={<BuildingIntercomLayout />}>
    <Route index element={<BuildingIntercomHomePage />} />
    <Route path={BUILDING_INTERCOM_PATHS.indoorStations} element={<IndoorStationsPage />} />
    <Route path={BUILDING_INTERCOM_PATHS.outdoorStations} element={<OutdoorStationsPage />} />
    <Route path={BUILDING_INTERCOM_PATHS.liveCalls} element={<LiveCallsPage />} />
    <Route path={BUILDING_INTERCOM_PATHS.callHistory} element={<CallHistoryPage />} />
    <Route path={BUILDING_INTERCOM_PATHS.remoteUnlock} element={<RemoteUnlockPage />} />
    <Route path={BUILDING_INTERCOM_PATHS.voiceBroadcast} element={<VoiceBroadcastPage />} />
    <Route path={BUILDING_INTERCOM_PATHS.deviceStatus} element={<DeviceStatusPage />} />
    <Route path={BUILDING_INTERCOM_PATHS.recording} element={<RecordingPage />} />
    <Route path={BUILDING_INTERCOM_PATHS.configuration} element={<ConfigurationPage />} />
  </Route>
);
