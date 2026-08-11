import { Users, Building2, TrendingUp, DoorOpen } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { floorOccupancy, occupancyTrend } from '@/modules/environment-monitoring/mock';
import { OccupancyChart } from '@/modules/environment-monitoring/components/occupancy/OccupancyChart';
import { OccupancyFloorCards } from '@/modules/environment-monitoring/components/occupancy/OccupancyFloorCards';

export function OccupancyPage() {
  const totalCurrent = floorOccupancy.reduce((sum, f) => sum + f.current, 0);
  const totalCapacity = floorOccupancy.reduce((sum, f) => sum + f.capacity, 0);
  const totalPeak = floorOccupancy.reduce((sum, f) => sum + f.peak, 0);
  const busiestFloor = [...floorOccupancy].sort((a, b) => b.current - a.current)[0];
  const availableCapacity = Math.max(0, totalCapacity - totalCurrent);

  return (
    <div>
      <PageHeader title="Occupancy" description="Real-time headcount and capacity across every floor and zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Current Occupancy" value={totalCurrent} icon={Users} tone="neutral" />
        <StatCard label="Building Occupancy" value={`${Math.round((totalCurrent / totalCapacity) * 100)}%`} icon={Building2} tone="neutral" />
        <StatCard label="Busiest Floor" value={busiestFloor ? busiestFloor.floor : '—'} icon={DoorOpen} tone="neutral" hint={busiestFloor ? `${busiestFloor.current} occupants` : undefined} />
        <StatCard label="Peak Occupancy" value={totalPeak} icon={TrendingUp} tone="warning" />
        <StatCard label="Available Capacity" value={availableCapacity} icon={Users} tone="success" />
      </div>

      <div className="mb-4">
        <OccupancyChart data={occupancyTrend} />
      </div>

      <OccupancyFloorCards floors={floorOccupancy} />
    </div>
  );
}
