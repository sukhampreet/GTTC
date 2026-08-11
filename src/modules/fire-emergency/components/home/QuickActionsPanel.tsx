import { Link } from 'react-router-dom';
import { Radio, RotateCcw, Siren, ScrollText } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { FIRE_EMERGENCY_PATHS } from '@/modules/fire-emergency/constants/paths';

const QUICK_ACTIONS = [
  { label: 'Send Emergency Broadcast', icon: Radio, path: FIRE_EMERGENCY_PATHS.broadcast },
  { label: 'Reset Active Alarms', icon: RotateCcw, path: FIRE_EMERGENCY_PATHS.alarmReset },
  { label: 'Open Emergency Response', icon: Siren, path: FIRE_EMERGENCY_PATHS.emergencyResponse },
  { label: 'View Event Logs', icon: ScrollText, path: FIRE_EMERGENCY_PATHS.eventLogs },
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
              to={`${ROUTES.fireEmergency}/${action.path}`}
              className="flex flex-col items-start gap-2 rounded-(--radius-md) border border-border-default bg-surface-raised p-3 text-left transition-colors hover:border-primary-500/60 hover:bg-surface-hover"
            >
              <div className="flex size-8 items-center justify-center rounded-(--radius-md) bg-danger-bg text-danger-400">
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
