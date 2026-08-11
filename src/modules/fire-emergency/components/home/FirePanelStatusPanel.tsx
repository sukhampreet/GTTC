import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { firePanels } from '@/modules/fire-emergency/mock';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/fire-emergency/components/shared/statusTone';

export function FirePanelStatusPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Fire Panel Status</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {firePanels.map((panel) => (
            <li key={panel.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-text-primary">{panel.name}</p>
                <p className="truncate text-[11px] text-text-tertiary">
                  {panel.building} · {panel.zone} · {panel.linkedDevices} devices
                </p>
              </div>
              <StatusBadge tone={DEVICE_STATUS_TONE[panel.status]}>{DEVICE_STATUS_LABEL[panel.status]}</StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
