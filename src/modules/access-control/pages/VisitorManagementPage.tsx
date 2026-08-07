import { UserRoundCheck, LogIn, LogOut, AlertTriangle, UserRoundPlus } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { Button } from '@/components/ui/Button';
import { visitorRecords } from '@/modules/access-control/mock';
import { VisitorTable } from '@/modules/access-control/components/visitors/VisitorTable';

export function VisitorManagementPage() {
  const checkedIn = visitorRecords.filter((v) => v.status === 'checked-in').length;
  const checkedOut = visitorRecords.filter((v) => v.status === 'checked-out').length;
  const overstayed = visitorRecords.filter((v) => v.status === 'overstayed').length;

  return (
    <div>
      <PageHeader
        title="Visitor Management"
        description="Track visitor check-in, check-out and pass issuance across all entry points."
        actions={
          <Button size="sm">
            <UserRoundPlus className="size-3.5" />
            Register Visitor
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Visitors Today" value={visitorRecords.length} icon={UserRoundCheck} tone="neutral" />
        <StatCard label="Checked In" value={checkedIn} icon={LogIn} tone="success" />
        <StatCard label="Checked Out" value={checkedOut} icon={LogOut} tone="info" />
        <StatCard label="Overstayed" value={overstayed} icon={AlertTriangle} tone="danger" />
      </div>

      <VisitorTable visitors={visitorRecords} />
    </div>
  );
}
