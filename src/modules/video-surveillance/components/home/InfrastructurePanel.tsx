import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { nvrRecords, edgeDeviceRecords } from '@/modules/video-surveillance/mock';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/video-surveillance/components/shared/statusTone';

export function InfrastructurePanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>NVR &amp; Edge Device Status</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {nvrRecords.map((nvr) => (
            <li key={nvr.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-text-primary">{nvr.name}</p>
                <p className="truncate text-[11px] text-text-tertiary">
                  {nvr.location} · {nvr.linkedCameras} cameras · {nvr.storageUsedPct}% storage
                </p>
              </div>
              <StatusBadge tone={DEVICE_STATUS_TONE[nvr.status]}>{DEVICE_STATUS_LABEL[nvr.status]}</StatusBadge>
            </li>
          ))}
          {edgeDeviceRecords.map((edge) => (
            <li key={edge.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-text-primary">{edge.name}</p>
                <p className="truncate text-[11px] text-text-tertiary">
                  {edge.model} · {edge.linkedCameras} cameras · {edge.inferenceLoadPct}% load
                </p>
              </div>
              <StatusBadge tone={DEVICE_STATUS_TONE[edge.status]}>{DEVICE_STATUS_LABEL[edge.status]}</StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
