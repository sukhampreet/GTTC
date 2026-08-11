import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { SmartParkingLayout } from '@/modules/smart-parking/layout/SmartParkingLayout';
import { SMART_PARKING_PATHS } from '@/modules/smart-parking/constants/paths';

import { SmartParkingHomePage } from '@/modules/smart-parking/pages/SmartParkingHomePage';
import { LiveParkingPage } from '@/modules/smart-parking/pages/LiveParkingPage';
import { EntryGatePage } from '@/modules/smart-parking/pages/EntryGatePage';
import { ExitGatePage } from '@/modules/smart-parking/pages/ExitGatePage';
import { VehicleListPage } from '@/modules/smart-parking/pages/VehicleListPage';
import { ParkingSlotsPage } from '@/modules/smart-parking/pages/ParkingSlotsPage';
import { BarrierControlPage } from '@/modules/smart-parking/pages/BarrierControlPage';
import { VisitorVehiclePage } from '@/modules/smart-parking/pages/VisitorVehiclePage';
import { ANPRPage } from '@/modules/smart-parking/pages/ANPRPage';
import { ParkingReportsPage } from '@/modules/smart-parking/pages/ParkingReportsPage';
import { VehicleHistoryPage } from '@/modules/smart-parking/pages/VehicleHistoryPage';

/**
 * Sprint 7 — Smart Parking module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>; this is the only
 * "minimal registration" touch point required in the shared routing file.
 */
export const smartParkingRoutes = (
  <Route key="smart-parking" path={ROUTES.smartParking} element={<SmartParkingLayout />}>
    <Route index element={<SmartParkingHomePage />} />
    <Route path={SMART_PARKING_PATHS.liveParking} element={<LiveParkingPage />} />
    <Route path={SMART_PARKING_PATHS.entryGate} element={<EntryGatePage />} />
    <Route path={SMART_PARKING_PATHS.exitGate} element={<ExitGatePage />} />
    <Route path={SMART_PARKING_PATHS.vehicleList} element={<VehicleListPage />} />
    <Route path={SMART_PARKING_PATHS.parkingSlots} element={<ParkingSlotsPage />} />
    <Route path={SMART_PARKING_PATHS.barrierControl} element={<BarrierControlPage />} />
    <Route path={SMART_PARKING_PATHS.visitorVehicle} element={<VisitorVehiclePage />} />
    <Route path={SMART_PARKING_PATHS.anpr} element={<ANPRPage />} />
    <Route path={SMART_PARKING_PATHS.parkingReports} element={<ParkingReportsPage />} />
    <Route path={SMART_PARKING_PATHS.vehicleHistory} element={<VehicleHistoryPage />} />
  </Route>
);
