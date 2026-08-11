import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { networkServiceStatus, networkSettings } from '@/modules/settings/mock';
import { SYSTEM_STATUS_LABEL, SYSTEM_STATUS_TONE } from '@/modules/settings/components/shared/statusTone';

export function NetworkPage() {
  return (
    <div>
      <PageHeader
        title="Network"
        description="Configuration representation of the platform's network connectivity. Read-only — does not modify the actual machine network."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Network Configuration</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="p-0">
            <ul className="divide-y divide-border-default">
              {networkSettings.map((s) => (
                <li key={s.id} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-[12.5px] text-text-secondary">{s.label}</span>
                  <span className="font-mono text-[12.5px] font-medium text-text-primary">{s.value}</span>
                </li>
              ))}
            </ul>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Connectivity Health</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="p-0">
            <ul className="divide-y divide-border-default">
              {networkServiceStatus.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-text-primary">{s.label}</p>
                    <p className="truncate text-[11px] text-text-tertiary">{s.detail}</p>
                  </div>
                  <StatusBadge tone={SYSTEM_STATUS_TONE[s.state]}>{SYSTEM_STATUS_LABEL[s.state]}</StatusBadge>
                </li>
              ))}
            </ul>
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
