import { Link } from 'react-router-dom';
import { MonitorPlay, History, Camera, ScanSearch } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { VIDEO_SURVEILLANCE_PATHS } from '@/modules/video-surveillance/constants/paths';

const QUICK_ACTIONS = [
  { label: 'Open Live View', icon: MonitorPlay, path: VIDEO_SURVEILLANCE_PATHS.liveView },
  { label: 'Search Playback', icon: History, path: VIDEO_SURVEILLANCE_PATHS.playback },
  { label: 'View Camera List', icon: Camera, path: VIDEO_SURVEILLANCE_PATHS.cameraList },
  { label: 'AI Detection Center', icon: ScanSearch, path: VIDEO_SURVEILLANCE_PATHS.aiDetection },
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
              to={`${ROUTES.videoSurveillance}/${action.path}`}
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
