import { Flame, Thermometer, PanelTop, Siren, TriangleAlert } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { fireStatusSnapshot } from '@/modules/live-monitoring/mock/fire';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/live-monitoring/components/shared/statusTone';

/** Professional fire monitoring panel — zone-level smoke/heat sensor status. */
export function FireWidget() {
  const snapshot = fireStatusSnapshot;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Smoke Sensors" value={snapshot.smokeSensors} icon={Thermometer} tone="neutral" />
        <StatCard label="Heat Sensors" value={snapshot.heatSensors} icon={Flame} tone="neutral" />
        <StatCard label="Fire Panels" value={snapshot.firePanels} icon={PanelTop} tone="info" />
        <StatCard label="Active Alarms" value={snapshot.activeAlarms} icon={Siren} tone={snapshot.activeAlarms > 0 ? 'danger' : 'success'} />
        <StatCard label="Fault Devices" value={snapshot.faultDevices} icon={TriangleAlert} tone="warning" />
      </div>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Alarm Zones</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {snapshot.zones.map((zone) => (
              <li key={zone.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{zone.zone}</p>
                  <p className="truncate text-[11px] text-text-tertiary">
                    {zone.building} · {zone.smokeSensors} smoke · {zone.heatSensors} heat sensors
                  </p>
                </div>
                {zone.status === 'alarm' ? (
                  <StatusBadge tone="danger" className="shrink-0">Alarm</StatusBadge>
                ) : (
                  <StatusBadge tone={DEVICE_STATUS_TONE[zone.status]} className="shrink-0">
                    {DEVICE_STATUS_LABEL[zone.status]}
                  </StatusBadge>
                )}
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
