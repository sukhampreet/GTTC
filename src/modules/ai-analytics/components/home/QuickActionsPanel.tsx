import { useNavigate } from 'react-router-dom';
import { ScanFace, ShieldAlert, HardHat, FileBarChart } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { AI_ANALYTICS_PATHS } from '@/modules/ai-analytics/constants/paths';

const ACTIONS = [
  { label: 'Face Recognition', path: AI_ANALYTICS_PATHS.faceRecognition, icon: ScanFace },
  { label: 'AI Alerts', path: AI_ANALYTICS_PATHS.alerts, icon: ShieldAlert },
  { label: 'PPE Detection', path: AI_ANALYTICS_PATHS.ppeDetection, icon: HardHat },
  { label: 'AI Reports', path: AI_ANALYTICS_PATHS.reports, icon: FileBarChart },
];

export function QuickActionsPanel() {
  const navigate = useNavigate();

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Quick Actions</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="grid flex-1 grid-cols-2 gap-2.5">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => navigate(`${ROUTES.aiAnalytics}/${action.path}`)}
              className="flex flex-col items-start gap-2.5 rounded-(--radius-md) border border-border-default bg-surface-raised p-3 text-left transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <div className="flex size-8 items-center justify-center rounded-(--radius-md) bg-primary-900 text-primary-300">
                <Icon className="size-4" />
              </div>
              <span className="text-[12px] font-medium text-text-primary">{action.label}</span>
            </button>
          );
        })}
      </AppCardContent>
    </AppCard>
  );
}
