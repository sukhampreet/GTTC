import { useState } from 'react';
import { CheckCircle2, UserPlus, XCircle, Archive } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { EVENT_SEVERITY_TONE, EVENT_STATUS_TONE, titleCase } from '@/modules/event-center/components/shared/statusTone';
import { events } from '@/modules/event-center/mock/events';
import type { EventItem, EventStatus } from '@/modules/event-center/types';

export interface EventDetailPanelProps {
  event: EventItem;
}

type PendingAction = { label: string; nextStatus: EventStatus } | null;

const FIELD_ROWS: Array<{ label: string; value: (e: EventItem) => string }> = [
  { label: 'Event ID', value: (e) => e.id },
  { label: 'Timestamp', value: (e) => e.timestamp },
  { label: 'Event Type', value: (e) => e.eventType },
  { label: 'Source Module', value: (e) => e.sourceModule },
  { label: 'Source Device', value: (e) => e.device },
  { label: 'Location', value: (e) => e.location },
];

export function EventDetailPanel({ event }: EventDetailPanelProps) {
  const [status, setStatus] = useState<EventStatus>(event.status);
  const [acknowledged, setAcknowledged] = useState(event.acknowledged);
  const [operator, setOperator] = useState(event.assignedOperator);
  const [pending, setPending] = useState<PendingAction>(null);

  const related = events.filter((e) => e.id !== event.id && (e.device === event.device || e.location === event.location)).slice(0, 5);
  const history = events
    .filter((e) => e.device === event.device)
    .slice(0, 6)
    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  function runAction() {
    if (!pending) return;
    setStatus(pending.nextStatus);
    if (pending.nextStatus === 'acknowledged' || pending.nextStatus === 'assigned') setAcknowledged(true);
    if (pending.nextStatus === 'assigned') setOperator((prev) => prev ?? 'Current Operator');
    setPending(null);
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard className="xl:col-span-2">
        <AppCardHeader>
          <AppCardTitle>Event Details — {event.id}</AppCardTitle>
          <div className="flex items-center gap-2">
            <StatusBadge tone={EVENT_SEVERITY_TONE[event.severity]}>{titleCase(event.severity)}</StatusBadge>
            <StatusBadge tone={EVENT_STATUS_TONE[status]} dot={false}>
              {titleCase(status)}
            </StatusBadge>
          </div>
        </AppCardHeader>
        <AppCardContent>
          <p className="mb-4 text-[13px] text-text-secondary">{event.description}</p>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {FIELD_ROWS.map((row) => (
              <div key={row.label}>
                <dt className="text-[11px] uppercase tracking-wide text-text-tertiary">{row.label}</dt>
                <dd className="mt-0.5 text-[13px] text-text-primary">{row.value(event)}</dd>
              </div>
            ))}
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-text-tertiary">Acknowledgement</dt>
              <dd className="mt-0.5 text-[13px] text-text-primary">{acknowledged ? 'Acknowledged' : 'Not acknowledged'}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wide text-text-tertiary">Assigned Operator</dt>
              <dd className="mt-0.5 text-[13px] text-text-primary">{operator ?? 'Unassigned'}</dd>
            </div>
          </dl>
        </AppCardContent>
      </AppCard>

      <div className="space-y-4">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Actions</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              disabled={acknowledged}
              onClick={() => setPending({ label: 'Acknowledge this event?', nextStatus: 'acknowledged' })}
            >
              <CheckCircle2 className="size-3.5" />
              Acknowledge
            </Button>
            <Button variant="outline" onClick={() => setPending({ label: 'Assign this event to yourself?', nextStatus: 'assigned' })}>
              <UserPlus className="size-3.5" />
              Assign to Me
            </Button>
            <Button variant="outline" onClick={() => setPending({ label: 'Mark this event as resolved?', nextStatus: 'resolved' })}>
              <CheckCircle2 className="size-3.5" />
              Resolve
            </Button>
            <Button variant="outline" onClick={() => setPending({ label: 'Close this event?', nextStatus: 'closed' })}>
              <Archive className="size-3.5" />
              Close
            </Button>
            {acknowledged && (
              <Button variant="ghost" onClick={() => setPending({ label: 'Unacknowledge this event?', nextStatus: 'open' })}>
                <XCircle className="size-3.5" />
                Unacknowledge
              </Button>
            )}
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Related Events</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="space-y-2">
            {related.length === 0 && <p className="text-[12px] text-text-tertiary">No related events found.</p>}
            {related.map((r) => (
              <div key={r.id} className="rounded-(--radius-md) border border-border-default bg-surface-raised p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-text-tertiary">{r.id}</span>
                  <StatusBadge tone={EVENT_SEVERITY_TONE[r.severity]} dot={false}>
                    {titleCase(r.severity)}
                  </StatusBadge>
                </div>
                <p className="mt-1 text-[12.5px] text-text-primary">{r.eventType}</p>
              </div>
            ))}
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Event History (This Device)</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="space-y-2">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between gap-2 text-[12px]">
                <span className="font-mono text-text-tertiary">{h.timestamp}</span>
                <span className="truncate text-text-secondary">{h.eventType}</span>
              </div>
            ))}
          </AppCardContent>
        </AppCard>
      </div>

      <ConfirmationDialog
        open={pending !== null}
        title="Confirm Action"
        description={pending?.label}
        confirmLabel="Confirm"
        onConfirm={runAction}
        onCancel={() => setPending(null)}
      />
    </div>
  );
}
