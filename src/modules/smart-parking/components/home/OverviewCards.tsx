import {
  ParkingSquare,
  CircleParking,
  CircleCheck,
  BookmarkCheck,
  Car,
  LogIn,
  LogOut,
  Wifi,
  WifiOff,
  Gauge,
  ScanLine,
} from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { parkingSlots, vehicles, entryActivity, exitActivity, parkingGates, barriers } from '@/modules/smart-parking/mock';

export function OverviewCards() {
  const occupied = parkingSlots.filter((s) => s.status === 'occupied').length;
  const available = parkingSlots.filter((s) => s.status === 'available').length;
  const reserved = parkingSlots.filter((s) => s.status === 'reserved').length;
  const currentVehicles = vehicles.filter((v) => v.status === 'parked').length;
  const onlineGates = parkingGates.filter((g) => g.gateStatus === 'online').length;
  const offlineGates = parkingGates.filter((g) => g.gateStatus !== 'online').length;
  const openBarriers = barriers.filter((b) => b.barrierStatus === 'open').length;
  const anprOnline = parkingGates.filter((g) => g.anprStatus === 'online').length;

  const cards = [
    { label: 'Total Parking Slots', value: parkingSlots.length, icon: ParkingSquare, tone: 'neutral' as const },
    { label: 'Occupied Slots', value: occupied, icon: CircleParking, tone: 'info' as const },
    { label: 'Available Slots', value: available, icon: CircleCheck, tone: 'success' as const },
    { label: 'Reserved Slots', value: reserved, icon: BookmarkCheck, tone: 'warning' as const },
    { label: 'Current Vehicles', value: currentVehicles, icon: Car, tone: 'neutral' as const },
    { label: 'Entry Vehicles (Today)', value: entryActivity.length, icon: LogIn, tone: 'success' as const },
    { label: 'Exit Vehicles (Today)', value: exitActivity.length, icon: LogOut, tone: 'info' as const },
    { label: 'Online Gates', value: onlineGates, icon: Wifi, tone: 'success' as const },
    { label: 'Offline Gates', value: offlineGates, icon: WifiOff, tone: offlineGates > 0 ? ('danger' as const) : ('success' as const) },
    { label: 'Barriers Open', value: openBarriers, icon: Gauge, tone: openBarriers > 0 ? ('warning' as const) : ('success' as const) },
    { label: 'ANPR Cameras Online', value: `${anprOnline}/${parkingGates.length}`, icon: ScanLine, tone: 'success' as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
