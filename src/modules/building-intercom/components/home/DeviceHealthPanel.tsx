import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { indoorStations, outdoorStations } from '@/modules/building-intercom/mock';
import { OPERATIONAL_STATE_LABEL, OPERATIONAL_STATE_TONE } from '@/modules/building-intercom/components/shared/statusTone';

/** Surfaces device health + signal quality together — the pair the Sprint spec asks for on the Home overview. */
export function DeviceHealthPanel() {
  const rows = [
    ...indoorStations.map((s) => ({ id: s.id, name: s.stationName, location: `${s.building} · ${s.floor}`, state: s.status, signal: s.signalStrengthPct })),
    ...outdoorStations.map((s) => ({ id: s.id, name: s.stationName, location: s.location, state: s.onlineStatus, signal: null })),
  ]
    .filter((row) => row.state !== 'online')
    .slice(0, 6);

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Device Health &amp; Signal Quality</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        {rows.length === 0 ? (
          <p className="px-4 py-6 text-center text-[12.5px] text-text-tertiary">All devices healthy — no issues detected.</p>
        ) : (
          <ul className="divide-y divide-border-default">
            {rows.map((row) => (
              <li key={row.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-text-primary">{row.name}</p>
                  <p className="truncate text-[11px] text-text-tertiary">
                    {row.location}
                    {row.signal !== null ? ` · Signal ${row.signal}%` : ''}
                  </p>
                </div>
                <StatusBadge tone={OPERATIONAL_STATE_TONE[row.state]}>{OPERATIONAL_STATE_LABEL[row.state]}</StatusBadge>
              </li>
            ))}
          </ul>
        )}
      </AppCardContent>
    </AppCard>
  );
}
