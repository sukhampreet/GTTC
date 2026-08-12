import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import type { ParkingEvent } from '@/modules/smart-parking/types';

export interface EntryActivityTableProps {
  events: ParkingEvent[];
}

export function EntryActivityTable({ events }: EntryActivityTableProps) {
  return (
    <AppCard className="overflow-hidden">
      <AppCardHeader>
        <AppCardTitle>Recent Entry Activity</AppCardTitle>
      </AppCardHeader>
      {events.length === 0 ? (
        <EmptyState title="No recent entries" description="No vehicles have entered through this gate recently." />
      ) : (
        <AppCardContent className="overflow-x-auto p-0">
          <table className="w-full border-collapse text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-border-default bg-surface-raised/60">
                <th className="whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Timestamp</th>
                <th className="whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Vehicle Number</th>
                <th className="whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Vehicle Type</th>
                <th className="whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Slot Assigned</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-border-default last:border-0 hover:bg-surface-hover/60">
                  <td className="whitespace-nowrap px-3.5 py-2.5 font-mono text-[12px] text-text-secondary">{event.timestamp}</td>
                  <td className="whitespace-nowrap px-3.5 py-2.5 font-mono text-[12px] text-text-secondary">{event.vehicleNumber}</td>
                  <td className="whitespace-nowrap px-3.5 py-2.5 text-text-secondary">{event.vehicleType}</td>
                  <td className="whitespace-nowrap px-3.5 py-2.5 text-text-secondary">{event.slot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AppCardContent>
      )}
    </AppCard>
  );
}
