import { Link } from 'react-router-dom';
import { KeyRound, Megaphone, PhoneCall, Building2 } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { BUILDING_INTERCOM_PATHS } from '@/modules/building-intercom/constants/paths';

const QUICK_ACTIONS = [
  { label: 'Open Remote Unlock', icon: KeyRound, path: BUILDING_INTERCOM_PATHS.remoteUnlock },
  { label: 'Send Voice Broadcast', icon: Megaphone, path: BUILDING_INTERCOM_PATHS.voiceBroadcast },
  { label: 'View Live Calls', icon: PhoneCall, path: BUILDING_INTERCOM_PATHS.liveCalls },
  { label: 'Manage Indoor Stations', icon: Building2, path: BUILDING_INTERCOM_PATHS.indoorStations },
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
              to={`${ROUTES.buildingIntercom}/${action.path}`}
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
