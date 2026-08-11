import { Car, CircleParking, LogOut } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { vehicles } from '@/modules/smart-parking/mock';
import { VehicleListTable } from '@/modules/smart-parking/components/vehicleList/VehicleListTable';

export function VehicleListPage() {
  const parked = vehicles.filter((v) => v.status === 'parked').length;
  const exited = vehicles.filter((v) => v.status === 'exited').length;

  return (
    <div>
      <PageHeader title="Vehicle List" description="Complete record of every vehicle currently parked or that has exited today." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Vehicles" value={vehicles.length} icon={Car} tone="neutral" />
        <StatCard label="Currently Parked" value={parked} icon={CircleParking} tone="info" />
        <StatCard label="Exited Today" value={exited} icon={LogOut} tone="neutral" />
      </div>

      <VehicleListTable vehicles={vehicles} />
    </div>
  );
}
