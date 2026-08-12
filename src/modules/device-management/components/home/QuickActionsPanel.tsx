import { Link } from 'react-router-dom';
import { Activity, UploadCloud, Wrench, Network } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { DEVICE_MANAGEMENT_PATHS } from '@/modules/device-management/constants/paths';

const QUICK_ACTIONS = [
  { label: 'Run Diagnostics', icon: Activity, path: DEVICE_MANAGEMENT_PATHS.diagnostics },
  { label: 'Firmware', icon: UploadCloud, path: DEVICE_MANAGEMENT_PATHS.firmware },
  { label: 'Maintenance', icon: Wrench, path: DEVICE_MANAGEMENT_PATHS.maintenance },
  { label: 'Network Devices', icon: Network, path: DEVICE_MANAGEMENT_PATHS.network },
];

export function QuickActionsPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Quick Actions</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={`${ROUTES.deviceManagement}/${action.path}`}
              className="flex flex-col items-start gap-2 rounded-(--radius-md) border border-border-default bg-surface-raised p-3 text-left transition-colors hover:border-primary-500/60 hover:bg-surface-hover"
            >
              <div className="flex size-8 items-center justify-center rounded-(--radius-md) bg-primary-900 text-primary-300">
                <Icon className="size-4" />
              </div>
              <span className="text-[12.5px] font-medium text-text-primary">{action.label}</span>
            </Link>
          );
        })}
      </AppCardContent>
    </AppCard>
  );
}
