import { useMemo, useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { SearchBar } from '@/components/data/SearchBar';
import { FilterBar } from '@/components/data/FilterBar';
import { Button } from '@/components/ui/Button';
import { accessPermissionRecords } from '@/modules/access-control/mock';
import { PermissionCards } from '@/modules/access-control/components/permissions/PermissionCards';

export function AccessPermissionsPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      accessPermissionRecords.filter(
        (p) =>
          p.user.toLowerCase().includes(query.trim().toLowerCase()) ||
          p.accessGroup.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <div>
      <PageHeader
        title="Access Permissions"
        description="Assign users and groups to doors, schedules and permission sets."
        actions={
          <Button size="sm">
            <PlusCircle className="size-3.5" />
            Assign Permission
          </Button>
        }
      />

      <FilterBar className="mb-4">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by user or access group…"
          containerClassName="w-full max-w-xs"
        />
      </FilterBar>

      <PermissionCards permissions={filtered} />
    </div>
  );
}
