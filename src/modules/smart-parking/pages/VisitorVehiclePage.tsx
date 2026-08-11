import { UserRoundCheck, BadgeCheck, LogOut } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { visitorVehicles } from '@/modules/smart-parking/mock';
import { VisitorVehicleTable } from '@/modules/smart-parking/components/visitorVehicle/VisitorVehicleTable';

export function VisitorVehiclePage() {
  const active = visitorVehicles.filter((v) => v.passStatus === 'active').length;
  const checkedOut = visitorVehicles.filter((v) => v.passStatus === 'checked-out').length;

  return (
    <div>
      <PageHeader title="Visitor Vehicle" description="Visitor vehicle passes, hosts and parking assignments." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Visitor Vehicles" value={visitorVehicles.length} icon={UserRoundCheck} tone="neutral" />
        <StatCard label="Active Passes" value={active} icon={BadgeCheck} tone="success" />
        <StatCard label="Checked Out" value={checkedOut} icon={LogOut} tone="neutral" />
      </div>

      <VisitorVehicleTable visitors={visitorVehicles} />
    </div>
  );
}
