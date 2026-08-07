import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { SearchBar } from '@/components/data/SearchBar';
import { FilterBar } from '@/components/data/FilterBar';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/feedback/EmptyState';
import { DoorClosed, ShieldAlert, Wifi, WifiOff } from 'lucide-react';
import { doorLiveStatus } from '@/modules/access-control/mock';
import { DoorStatusGrid } from '@/modules/access-control/components/doorStatus/DoorStatusGrid';

const BUILDINGS = ['All Buildings', ...Array.from(new Set(doorLiveStatus.map((d) => d.building)))];

export function LiveDoorStatusPage() {
  const [query, setQuery] = useState('');
  const [building, setBuilding] = useState('All Buildings');

  const filtered = useMemo(() => {
    return doorLiveStatus.filter((door) => {
      const matchesBuilding = building === 'All Buildings' || door.building === building;
      const matchesQuery = door.doorName.toLowerCase().includes(query.trim().toLowerCase());
      return matchesBuilding && matchesQuery;
    });
  }, [query, building]);

  const onlineCount = doorLiveStatus.filter((d) => d.connectionStatus === 'online').length;
  const offlineCount = doorLiveStatus.filter((d) => d.connectionStatus === 'offline').length;
  const alarmCount = doorLiveStatus.filter((d) => d.doorStatus === 'forced' || d.doorStatus === 'held-open').length;

  return (
    <div>
      <PageHeader title="Live Door Status" description="Real-time monitoring of every door, controller and reader across the facility." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Doors" value={doorLiveStatus.length} icon={DoorClosed} tone="neutral" />
        <StatCard label="Connected" value={onlineCount} icon={Wifi} tone="success" />
        <StatCard label="Disconnected" value={offlineCount} icon={WifiOff} tone="danger" />
        <StatCard label="Active Alarms" value={alarmCount} icon={ShieldAlert} tone="warning" />
      </div>

      <FilterBar className="mb-4">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search doors…"
          containerClassName="w-full max-w-xs"
        />
        <div className="flex flex-wrap items-center gap-1.5">
          {BUILDINGS.map((b) => (
            <Button
              key={b}
              size="sm"
              variant={building === b ? 'primary' : 'outline'}
              onClick={() => setBuilding(b)}
            >
              {b}
            </Button>
          ))}
        </div>
      </FilterBar>

      {filtered.length === 0 ? (
        <EmptyState title="No doors match your filters" description="Try a different search term or building." />
      ) : (
        <DoorStatusGrid doors={filtered} />
      )}
    </div>
  );
}
