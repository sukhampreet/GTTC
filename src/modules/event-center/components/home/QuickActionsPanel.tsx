import { Link } from 'react-router-dom';
import { Search, Download, PlayCircle, BarChart3 } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';

const QUICK_ACTIONS = [
  { label: 'Search Events', icon: Search, path: EVENT_CENTER_PATHS.search },
  { label: 'Export Events', icon: Download, path: EVENT_CENTER_PATHS.export },
  { label: 'Event Replay', icon: PlayCircle, path: EVENT_CENTER_PATHS.replay },
  { label: 'View Statistics', icon: BarChart3, path: EVENT_CENTER_PATHS.statistics },
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
              to={`${ROUTES.eventCenter}/${action.path}`}
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
