import { useNavigate } from 'react-router-dom';
import { ShieldAlert, BrainCircuit, HardDrive, Download } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { REPORTS_PATHS } from '@/modules/reports/constants/paths';

const ACTIONS = [
  { label: 'Incident Reports', path: REPORTS_PATHS.incident, icon: ShieldAlert },
  { label: 'AI Reports', path: REPORTS_PATHS.ai, icon: BrainCircuit },
  { label: 'Device Reports', path: REPORTS_PATHS.device, icon: HardDrive },
  { label: 'Export Report', path: REPORTS_PATHS.export, icon: Download },
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
              onClick={() => navigate(`${ROUTES.reports}/${action.path}`)}
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
