import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { SearchBar } from '@/components/data/SearchBar';
import { FilterBar } from '@/components/data/FilterBar';
import { Button } from '@/components/ui/Button';
import { events } from '@/modules/event-center/mock/events';
import { EventTimelineList } from '@/modules/event-center/components/timeline/EventTimelineList';
import { titleCase } from '@/modules/event-center/components/shared/statusTone';
import type { EventSeverity, EventStatus, SourceModule } from '@/modules/event-center/types';

const MODULES: Array<SourceModule | 'all'> = ['all', ...Array.from(new Set(events.map((e) => e.sourceModule)))] as Array<
  SourceModule | 'all'
>;
const SEVERITIES: Array<EventSeverity | 'all'> = ['all', 'critical', 'high', 'warning', 'info'];
const STATUSES: Array<EventStatus | 'all'> = ['all', 'open', 'acknowledged', 'assigned', 'resolved', 'closed'];

export function EventTimelinePage() {
  const [query, setQuery] = useState('');
  const [module, setModule] = useState<SourceModule | 'all'>('all');
  const [severity, setSeverity] = useState<EventSeverity | 'all'>('all');
  const [status, setStatus] = useState<EventStatus | 'all'>('all');

  const filtered = useMemo(
    () =>
      events.filter((event) => {
        const matchesQuery =
          !query.trim() ||
          `${event.id} ${event.eventType} ${event.device} ${event.location}`.toLowerCase().includes(query.trim().toLowerCase());
        const matchesModule = module === 'all' || event.sourceModule === module;
        const matchesSeverity = severity === 'all' || event.severity === severity;
        const matchesStatus = status === 'all' || event.status === status;
        return matchesQuery && matchesModule && matchesSeverity && matchesStatus;
      }),
    [query, module, severity, status],
  );

  return (
    <div>
      <PageHeader title="Event Timeline" description="Chronological trail of every event across the platform, newest first." />

      <FilterBar className="mb-4 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ID, type, device or location…"
          containerClassName="w-full max-w-xs"
        />
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] uppercase tracking-wide text-text-tertiary">Module</span>
          {MODULES.slice(0, 6).map((m) => (
            <Button key={m} size="sm" variant={module === m ? 'primary' : 'outline'} onClick={() => setModule(m)}>
              {m === 'all' ? 'All' : m}
            </Button>
          ))}
        </div>
      </FilterBar>

      <FilterBar className="mb-4 flex-wrap gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] uppercase tracking-wide text-text-tertiary">Severity</span>
          {SEVERITIES.map((s) => (
            <Button key={s} size="sm" variant={severity === s ? 'primary' : 'outline'} onClick={() => setSeverity(s)}>
              {s === 'all' ? 'All' : titleCase(s)}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] uppercase tracking-wide text-text-tertiary">Status</span>
          {STATUSES.map((s) => (
            <Button key={s} size="sm" variant={status === s ? 'primary' : 'outline'} onClick={() => setStatus(s)}>
              {s === 'all' ? 'All' : titleCase(s)}
            </Button>
          ))}
        </div>
      </FilterBar>

      <EventTimelineList events={filtered} />
    </div>
  );
}
