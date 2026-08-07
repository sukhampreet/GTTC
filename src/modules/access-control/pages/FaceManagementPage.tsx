import { useMemo, useState } from 'react';
import { ScanFace, UserCheck, Clock3, Layers, UserRoundPlus } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { SearchBar } from '@/components/data/SearchBar';
import { FilterBar } from '@/components/data/FilterBar';
import { Button } from '@/components/ui/Button';
import { faceRecords, faceTemplateStats, faceGroups } from '@/modules/access-control/mock';
import { FaceManagementGrid } from '@/modules/access-control/components/faces/FaceManagementGrid';

export function FaceManagementPage() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All Groups');

  const filtered = useMemo(() => {
    return faceRecords.filter((f) => {
      const matchesGroup = group === 'All Groups' || f.group === group;
      const matchesQuery = f.name.toLowerCase().includes(query.trim().toLowerCase()) || f.employeeId.toLowerCase().includes(query.trim().toLowerCase());
      return matchesGroup && matchesQuery;
    });
  }, [query, group]);

  return (
    <div>
      <PageHeader
        title="Face Management"
        description="Manage enrolled face templates, pending registrations and recognition groups."
        actions={
          <Button size="sm">
            <UserRoundPlus className="size-3.5" />
            Enroll Face
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Registered Faces" value={faceTemplateStats.registered} icon={ScanFace} tone="success" />
        <StatCard label="Pending Registrations" value={faceTemplateStats.pending} icon={UserCheck} tone="warning" />
        <StatCard label="Face Groups" value={faceTemplateStats.groups} icon={Layers} tone="neutral" />
        <StatCard label="Avg. Template Quality" value={`${faceTemplateStats.avgQuality}%`} icon={Clock3} tone="info" />
      </div>

      <FilterBar className="mb-4">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or employee ID…"
          containerClassName="w-full max-w-xs"
        />
        <div className="flex flex-wrap items-center gap-1.5">
          {['All Groups', ...faceGroups].map((g) => (
            <Button key={g} size="sm" variant={group === g ? 'primary' : 'outline'} onClick={() => setGroup(g)}>
              {g}
            </Button>
          ))}
        </div>
      </FilterBar>

      <FaceManagementGrid faces={filtered} />
    </div>
  );
}
