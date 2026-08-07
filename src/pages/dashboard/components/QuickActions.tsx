import { useNavigate } from 'react-router-dom';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { NAVIGATION_CONFIG } from '@/config/navigation.config';
import { ROUTES } from '@/constants/routes';

const QUICK_ACTION_IDS = [
  'video-surveillance',
  'access-control',
  'fire-emergency',
  'smart-parking',
  'environment-monitoring',
  'reports',
  'device-management',
  'settings',
] as const;

/**
 * Dashboard shortcuts only — reuses the single source of truth NAVIGATION_CONFIG
 * for labels, icons and paths rather than redefining them. Clicking a card just
 * navigates via react-router, same as the sidebar; no new navigation logic.
 */
export function QuickActions() {
  const navigate = useNavigate();
  const items = NAVIGATION_CONFIG.filter((item) => QUICK_ACTION_IDS.includes(item.id as (typeof QUICK_ACTION_IDS)[number]));

  return (
    <section>
      <SectionHeader title="Quick Actions" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path ?? ROUTES.dashboard)}
              className="flex flex-col items-start gap-3 rounded-(--radius-lg) border border-border-default bg-surface p-4 text-left transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <div className="flex size-9 items-center justify-center rounded-(--radius-md) bg-primary-900 text-primary-300">
                <Icon className="size-4.5" />
              </div>
              <span className="text-[13px] font-medium text-text-primary">{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
