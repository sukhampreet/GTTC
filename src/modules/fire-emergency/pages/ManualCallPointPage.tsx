import { useMemo, useState } from 'react';
import { Siren, RotateCcw, Wrench } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { SearchBar } from '@/components/data/SearchBar';
import { FilterBar } from '@/components/data/FilterBar';
import { mcpDevices } from '@/modules/fire-emergency/mock';
import { McpGrid } from '@/modules/fire-emergency/components/mcp/McpGrid';

export function ManualCallPointPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => mcpDevices.filter((d) => d.mcpId.toLowerCase().includes(query.trim().toLowerCase()) || d.building.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  const pendingReset = mcpDevices.filter((d) => d.resetStatus === 'pending-reset').length;
  const faults = mcpDevices.filter((d) => d.status === 'fault').length;

  return (
    <div>
      <PageHeader title="Manual Call Point" description="Status and activation history of all manual call point (MCP) devices." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total MCPs" value={mcpDevices.length} icon={Siren} tone="neutral" />
        <StatCard label="Pending Reset" value={pendingReset} icon={RotateCcw} tone="warning" />
        <StatCard label="Faults" value={faults} icon={Wrench} tone="danger" />
      </div>

      <FilterBar className="mb-4">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by MCP ID or building…"
          containerClassName="w-full max-w-xs"
        />
      </FilterBar>

      <McpGrid devices={filtered} />
    </div>
  );
}
