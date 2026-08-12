import { useState } from 'react';
import { Check, UserCheck } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { DataTable, type DataTableColumn } from '@/modules/event-center/components/shared/DataTable';
import { EVENT_SEVERITY_TONE, EVENT_STATUS_TONE, titleCase } from '@/modules/event-center/components/shared/statusTone';
import type { EventItem } from '@/modules/event-center/types';

export interface EventsTableProps {
  events: EventItem[];
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  onSelect?: (event: EventItem) => void;
}

export function EventsTable({
  events,
  pageSize = 10,
  emptyTitle = 'No events found',
  emptyDescription = 'No events match the current search or filters.',
  onSelect,
}: EventsTableProps) {
  const [ackTarget, setAckTarget] = useState<EventItem | null>(null);
  const [localAck, setLocalAck] = useState<Set<string>>(new Set());

  const columns: DataTableColumn<EventItem>[] = [
    {
      id: 'timestamp',
      header: 'Timestamp',
      cell: (r) => <span className="font-mono text-[12px]">{r.timestamp}</span>,
      sortAccessor: (r) => r.timestamp,
    },
    {
      id: 'id',
      header: 'Event ID',
      cell: (r) =>
        onSelect ? (
          <button
            onClick={() => onSelect(r)}
            className="font-mono text-[12px] text-primary-400 underline-offset-2 hover:underline"
          >
            {r.id}
          </button>
        ) : (
          <span className="font-mono text-[12px]">{r.id}</span>
        ),
      sortAccessor: (r) => r.id,
    },
    { id: 'eventType', header: 'Event Type', cell: (r) => r.eventType, sortAccessor: (r) => r.eventType },
    { id: 'sourceModule', header: 'Source Module', cell: (r) => r.sourceModule, sortAccessor: (r) => r.sourceModule },
    { id: 'device', header: 'Device', cell: (r) => <span className="font-mono text-[12px]">{r.device}</span>, sortAccessor: (r) => r.device },
    { id: 'location', header: 'Location', cell: (r) => r.location, sortAccessor: (r) => r.location },
    {
      id: 'severity',
      header: 'Severity',
      cell: (r) => <StatusBadge tone={EVENT_SEVERITY_TONE[r.severity]}>{titleCase(r.severity)}</StatusBadge>,
      sortAccessor: (r) => r.severity,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (r) => <StatusBadge tone={EVENT_STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
      sortAccessor: (r) => r.status,
    },
    {
      id: 'acknowledged',
      header: 'Ack.',
      align: 'center',
      cell: (r) =>
        r.acknowledged || localAck.has(r.id) ? (
          <Check className="mx-auto size-3.5 text-success-400" />
        ) : (
          <Button variant="outline" size="sm" onClick={() => setAckTarget(r)}>
            Acknowledge
          </Button>
        ),
    },
    {
      id: 'assignedOperator',
      header: 'Assigned Operator',
      cell: (r) =>
        r.assignedOperator ? (
          <span className="inline-flex items-center gap-1.5 text-text-secondary">
            <UserCheck className="size-3.5 text-text-tertiary" />
            {r.assignedOperator}
          </span>
        ) : (
          <span className="text-text-tertiary">Unassigned</span>
        ),
      sortAccessor: (r) => r.assignedOperator ?? '',
    },
  ];

  return (
    <>
      <DataTable
        data={events}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.id} ${r.eventType} ${r.sourceModule} ${r.device} ${r.location}`}
        searchPlaceholder="Search events by ID, type, device or location…"
        pageSize={pageSize}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      />

      <ConfirmationDialog
        open={ackTarget !== null}
        title="Acknowledge Event"
        description={ackTarget ? `Mark ${ackTarget.id} — ${ackTarget.eventType} as acknowledged?` : undefined}
        confirmLabel="Acknowledge"
        onConfirm={() => {
          if (ackTarget) setLocalAck((prev) => new Set(prev).add(ackTarget.id));
          setAckTarget(null);
        }}
        onCancel={() => setAckTarget(null)}
      />
    </>
  );
}
