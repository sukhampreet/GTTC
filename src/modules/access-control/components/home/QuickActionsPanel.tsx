import { Link } from 'react-router-dom';
import { DoorOpen, Siren, UserRoundPlus, ScanFace } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { ACCESS_CONTROL_PATHS } from '@/modules/access-control/constants/paths';

const QUICK_ACTIONS = [
  { label: 'Open Door Control', icon: DoorOpen, path: ACCESS_CONTROL_PATHS.doorControl },
  { label: 'Trigger Emergency Unlock', icon: Siren, path: ACCESS_CONTROL_PATHS.emergency },
  { label: 'Register New Visitor', icon: UserRoundPlus, path: ACCESS_CONTROL_PATHS.visitors },
  { label: 'Enroll Face Template', icon: ScanFace, path: ACCESS_CONTROL_PATHS.faces },
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
              to={`${ROUTES.accessControl}/${action.path}`}
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
