import {
  LayoutGrid,
  ParkingSquare,
  LogIn,
  LogOut,
  Car,
  Grid2x2,
  Gauge,
  UserRoundCheck,
  ScanLine,
  FileBarChart,
  History,
  type LucideIcon,
} from 'lucide-react';

import { SMART_PARKING_PATHS } from '@/modules/smart-parking/constants/paths';

export interface SmartParkingNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
}

export const SMART_PARKING_SUBNAV: SmartParkingNavItem[] = [
  { id: 'home', label: 'Parking Dashboard', path: SMART_PARKING_PATHS.home, icon: LayoutGrid, end: true },
  { id: 'live-parking', label: 'Live Parking', path: SMART_PARKING_PATHS.liveParking, icon: ParkingSquare },
  { id: 'entry-gate', label: 'Entry Gate', path: SMART_PARKING_PATHS.entryGate, icon: LogIn },
  { id: 'exit-gate', label: 'Exit Gate', path: SMART_PARKING_PATHS.exitGate, icon: LogOut },
  { id: 'vehicle-list', label: 'Vehicle List', path: SMART_PARKING_PATHS.vehicleList, icon: Car },
  { id: 'parking-slots', label: 'Parking Slots', path: SMART_PARKING_PATHS.parkingSlots, icon: Grid2x2 },
  { id: 'barrier-control', label: 'Barrier Control', path: SMART_PARKING_PATHS.barrierControl, icon: Gauge },
  { id: 'visitor-vehicle', label: 'Visitor Vehicle', path: SMART_PARKING_PATHS.visitorVehicle, icon: UserRoundCheck },
  { id: 'anpr', label: 'ANPR', path: SMART_PARKING_PATHS.anpr, icon: ScanLine },
  { id: 'parking-reports', label: 'Parking Reports', path: SMART_PARKING_PATHS.parkingReports, icon: FileBarChart },
  { id: 'vehicle-history', label: 'Vehicle History', path: SMART_PARKING_PATHS.vehicleHistory, icon: History },
];
