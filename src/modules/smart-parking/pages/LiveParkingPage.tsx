import { ParkingSquare, CircleParking, CircleCheck, BookmarkCheck, Ban } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { parkingSlots } from '@/modules/smart-parking/mock';
import { ParkingSlotGrid } from '@/modules/smart-parking/components/liveParking/ParkingSlotGrid';

export function LiveParkingPage() {
  const occupied = parkingSlots.filter((s) => s.status === 'occupied').length;
  const available = parkingSlots.filter((s) => s.status === 'available').length;
  const reserved = parkingSlots.filter((s) => s.status === 'reserved').length;
  const disabled = parkingSlots.filter((s) => s.status === 'disabled').length;
  const occupancyPct = Math.round((occupied / parkingSlots.length) * 100);

  return (
    <div>
      <PageHeader title="Live Parking" description="Real-time visual layout of every parking slot across the campus." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Slots" value={parkingSlots.length} icon={ParkingSquare} tone="neutral" />
        <StatCard label="Occupied" value={occupied} icon={CircleParking} tone="info" />
        <StatCard label="Available" value={available} icon={CircleCheck} tone="success" />
        <StatCard label="Reserved" value={reserved} icon={BookmarkCheck} tone="warning" />
        <StatCard label="Disabled" value={disabled} icon={Ban} tone="neutral" />
        <StatCard label="Current Occupancy" value={`${occupancyPct}%`} icon={ParkingSquare} tone={occupancyPct >= 80 ? 'danger' : 'info'} />
      </div>

      <ParkingSlotGrid slots={parkingSlots} />
    </div>
  );
}
