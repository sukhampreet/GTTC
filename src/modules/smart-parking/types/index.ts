import type { StatusTone } from '@/types/common';
import type { DeviceOnlineStatus } from '@/types/mock';

export type ParkingZoneId = 'Zone A' | 'Zone B' | 'Zone C' | 'Zone D';

export type ParkingSlotStatus = 'available' | 'occupied' | 'reserved' | 'disabled';

export type VehicleType = 'Car' | 'SUV' | 'Bike' | 'Truck' | 'EV';

export interface ParkingSlot {
  id: string;
  slotNumber: string;
  zone: ParkingZoneId;
  floor: string;
  status: ParkingSlotStatus;
  vehicleNumber: string | null;
  vehicleType: VehicleType | null;
  reservedFor: string | null;
  duration: string | null;
}

export type VehicleRecordStatus = 'parked' | 'exited';

export type VehicleCategory = 'Employee' | 'Visitor' | 'Resident' | 'Contractor';

export interface VehicleRecord {
  id: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  owner: string;
  category: VehicleCategory;
  entryTime: string;
  exitTime: string | null;
  duration: string;
  slot: string;
  status: VehicleRecordStatus;
}

export type GateDirection = 'entry' | 'exit';

export type BarrierStatus = 'open' | 'closed';

export interface ParkingGate {
  id: string;
  name: string;
  direction: GateDirection;
  gateStatus: DeviceOnlineStatus;
  barrierStatus: BarrierStatus;
  anprCameraName: string;
  anprStatus: DeviceOnlineStatus;
  lastVehicleNumber: string;
  lastVehicleTime: string;
  health: DeviceOnlineStatus;
}

export interface Barrier {
  id: string;
  name: string;
  gateName: string;
  direction: GateDirection;
  barrierStatus: BarrierStatus;
  gateStatus: DeviceOnlineStatus;
  controllerHealth: DeviceOnlineStatus;
}

export interface ANPRDetection {
  id: string;
  vehicleNumber: string;
  detectionTime: string;
  camera: string;
  gate: string;
  direction: GateDirection;
  confidence: number;
  vehicleType: VehicleType;
}

export type VisitorPassStatus = 'active' | 'expired' | 'checked-out';

export interface VisitorVehicle {
  id: string;
  vehicleNumber: string;
  visitorName: string;
  company: string;
  host: string;
  purpose: string;
  entryTime: string;
  exitTime: string | null;
  passStatus: VisitorPassStatus;
  slot: string;
}

export type ParkingEventType = 'entry' | 'exit';

export interface ParkingEvent {
  id: string;
  timestamp: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  event: ParkingEventType;
  gate: string;
  slot: string;
}

export interface DailyParkingStat {
  label: string;
  entries: number;
  exits: number;
}

export interface WeeklyOccupancyPoint {
  label: string;
  occupancy: number;
}

export interface PeakHourStat {
  hour: string;
  vehicles: number;
}

export type VehicleHistoryStatus = 'completed' | 'ongoing';

export interface VehicleHistoryEntry {
  id: string;
  vehicleNumber: string;
  date: string;
  entryTime: string;
  exitTime: string | null;
  gate: string;
  slot: string;
  duration: string;
  status: VehicleHistoryStatus;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  tone: StatusTone;
  timestamp: string;
}
