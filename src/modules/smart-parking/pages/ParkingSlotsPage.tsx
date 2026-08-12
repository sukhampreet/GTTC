import { useMemo, useState } from 'react';
import { Grid2x2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { FilterBar } from '@/components/data/FilterBar';
import { Button } from '@/components/ui/Button';
import { parkingSlots } from '@/modules/smart-parking/mock';
import { ParkingSlotsTable } from '@/modules/smart-parking/components/parkingSlots/ParkingSlotsTable';
import type { ParkingSlotStatus } from '@/modules/smart-parking/types';

const FILTERS: { id: 'all' | ParkingSlotStatus; label: string }[] = [
  { id: 'all', label: 'All Slots' },
  { id: 'available', label: 'Available' },
  { id: 'occupied', label: 'Occupied' },
  { id: 'reserved', label: 'Reserved' },
  { id: 'disabled', label: 'Disabled' },
];

export function ParkingSlotsPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | ParkingSlotStatus>('all');

  const filtered = useMemo(
    () => (statusFilter === 'all' ? parkingSlots : parkingSlots.filter((s) => s.status === statusFilter)),
    [statusFilter],
  );

  return (
    <div>
      <PageHeader title="Parking Slots" description="Slot inventory across every zone and floor, with reservation and vehicle detail." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Slots" value={parkingSlots.length} icon={Grid2x2} tone="neutral" />
        <StatCard label="Available" value={parkingSlots.filter((s) => s.status === 'available').length} icon={Grid2x2} tone="success" />
        <StatCard label="Occupied" value={parkingSlots.filter((s) => s.status === 'occupied').length} icon={Grid2x2} tone="info" />
        <StatCard label="Reserved" value={parkingSlots.filter((s) => s.status === 'reserved').length} icon={Grid2x2} tone="warning" />
      </div>

      <FilterBar className="mb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((f) => (
            <Button
              key={f.id}
              size="sm"
              variant={statusFilter === f.id ? 'primary' : 'outline'}
              onClick={() => setStatusFilter(f.id)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </FilterBar>

      <ParkingSlotsTable slots={filtered} />
    </div>
  );
}
