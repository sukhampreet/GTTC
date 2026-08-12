import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard } from '@/components/ui/AppCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';
import { events } from '@/modules/event-center/mock/events';
import { EventsTable } from '@/modules/event-center/components/events/EventsTable';

interface SearchFields {
  eventId: string;
  eventType: string;
  module: string;
  device: string;
  location: string;
  operator: string;
  date: string;
}

const EMPTY_FIELDS: SearchFields = { eventId: '', eventType: '', module: '', device: '', location: '', operator: '', date: '' };

const FIELD_LABELS: Record<keyof SearchFields, string> = {
  eventId: 'Event ID',
  eventType: 'Event Type',
  module: 'Module',
  device: 'Device',
  location: 'Location',
  operator: 'User / Operator',
  date: 'Date (YYYY-MM-DD)',
};

export function EventSearchPage() {
  const navigate = useNavigate();
  const [fields, setFields] = useState<SearchFields>(EMPTY_FIELDS);
  const [submitted, setSubmitted] = useState<SearchFields | null>(null);

  const results = useMemo(() => {
    if (!submitted) return events;
    return events.filter((e) => {
      const matches =
        (!submitted.eventId || e.id.toLowerCase().includes(submitted.eventId.toLowerCase())) &&
        (!submitted.eventType || e.eventType.toLowerCase().includes(submitted.eventType.toLowerCase())) &&
        (!submitted.module || e.sourceModule.toLowerCase().includes(submitted.module.toLowerCase())) &&
        (!submitted.device || e.device.toLowerCase().includes(submitted.device.toLowerCase())) &&
        (!submitted.location || e.location.toLowerCase().includes(submitted.location.toLowerCase())) &&
        (!submitted.operator || (e.assignedOperator ?? '').toLowerCase().includes(submitted.operator.toLowerCase())) &&
        (!submitted.date || e.timestamp.startsWith(submitted.date));
      return matches;
    });
  }, [submitted]);

  function handleSearch() {
    setSubmitted(fields);
  }

  function handleReset() {
    setFields(EMPTY_FIELDS);
    setSubmitted(null);
  }

  return (
    <div>
      <PageHeader title="Event Search" description="Search the full event history by ID, type, module, device, location, user or date." />

      <AppCard className="mb-4 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(EMPTY_FIELDS) as (keyof SearchFields)[]).map((key) => (
            <div key={key}>
              <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-text-tertiary" htmlFor={`field-${key}`}>
                {FIELD_LABELS[key]}
              </label>
              <Input
                id={`field-${key}`}
                value={fields[key]}
                onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))}
                placeholder={`Search by ${FIELD_LABELS[key].toLowerCase()}…`}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button onClick={handleSearch}>
            <Search className="size-3.5" />
            Search Events
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <X className="size-3.5" />
            Clear
          </Button>
          {submitted && <span className="ml-auto text-[11.5px] text-text-tertiary">{results.length} result(s) found</span>}
        </div>
      </AppCard>

      <EventsTable
        events={results}
        emptyTitle="No events found"
        emptyDescription="Adjust your search criteria and try again."
        onSelect={(event) => navigate(`${ROUTES.eventCenter}/${EVENT_CENTER_PATHS.details}?id=${event.id}`)}
      />
    </div>
  );
}
