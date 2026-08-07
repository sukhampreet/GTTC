import { ShieldBan, PlusCircle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { Button } from '@/components/ui/Button';
import { blacklistEntries } from '@/modules/access-control/mock';
import { BlacklistTable } from '@/modules/access-control/components/blacklist/BlacklistTable';

export function BlacklistPage() {
  const active = blacklistEntries.filter((e) => e.status === 'active').length;

  return (
    <div>
      <PageHeader
        title="Blacklist"
        description="Credentials and identities explicitly denied access across all doors."
        actions={
          <Button size="sm">
            <PlusCircle className="size-3.5" />
            Add to Blacklist
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Entries" value={blacklistEntries.length} icon={ShieldBan} tone="neutral" />
        <StatCard label="Active" value={active} icon={ShieldBan} tone="danger" />
        <StatCard label="Under Review" value={blacklistEntries.filter((e) => e.status === 'under-review').length} icon={ShieldBan} tone="warning" />
      </div>

      <BlacklistTable entries={blacklistEntries} />
    </div>
  );
}
