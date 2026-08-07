import { useNavigate } from 'react-router-dom';
import { Video, DoorOpen, FlameKindling, ParkingSquare, Thermometer, FileBarChart } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';

const ACTIONS = [
  { id: 'video', label: 'Open Video Surveillance', icon: Video, path: ROUTES.videoSurveillance },
  { id: 'access', label: 'Open Access Control', icon: DoorOpen, path: ROUTES.accessControl },
  { id: 'fire', label: 'Open Fire Module', icon: FlameKindling, path: ROUTES.fireEmergency },
  { id: 'parking', label: 'Open Parking Module', icon: ParkingSquare, path: ROUTES.smartParking },
  { id: 'environment', label: 'Open Environment Module', icon: Thermometer, path: ROUTES.environmentMonitoring },
  { id: 'reports', label: 'Open Reports', icon: FileBarChart, path: ROUTES.reports },
];

/** UI-only shortcuts into the sibling modules — navigates via react-router. */
export function QuickActionsPanel() {
  const navigate = useNavigate();

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Quick Actions</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="grid grid-cols-2 gap-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-start gap-2 rounded-(--radius-md) border border-border-default bg-surface-raised p-3 text-left transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <div className="flex size-7 items-center justify-center rounded-(--radius-sm) bg-primary-900 text-primary-300">
                <Icon className="size-3.5" />
              </div>
              <span className="text-[11.5px] font-medium leading-tight text-text-primary">{action.label}</span>
            </button>
          );
        })}
      </AppCardContent>
    </AppCard>
  );
}
