import { Link } from 'react-router-dom';
import { Thermometer, Wind, AlertTriangle, HardDrive } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { ENVIRONMENT_MONITORING_PATHS } from '@/modules/environment-monitoring/constants/paths';

const QUICK_ACTIONS = [
  { label: 'View Temperature', icon: Thermometer, path: ENVIRONMENT_MONITORING_PATHS.temperature },
  { label: 'Check Air Quality', icon: Wind, path: ENVIRONMENT_MONITORING_PATHS.airQuality },
  { label: 'Review Alerts', icon: AlertTriangle, path: ENVIRONMENT_MONITORING_PATHS.alerts },
  { label: 'Device Status', icon: HardDrive, path: ENVIRONMENT_MONITORING_PATHS.deviceStatus },
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
              to={`${ROUTES.environmentMonitoring}/${action.path}`}
              className="flex flex-col items-start gap-2 rounded-(--radius-md) border border-border-default bg-surface-raised p-3 text-left transition-colors hover:border-primary-500/60 hover:bg-surface-hover"
            >
              <div className="flex size-8 items-center justify-center rounded-(--radius-md) bg-info-bg text-info-400">
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
