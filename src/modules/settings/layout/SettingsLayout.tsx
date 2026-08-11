import { NavLink, Outlet } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { SETTINGS_SUBNAV } from '@/modules/settings/constants/subnav';

/**
 * Module-local secondary navigation, mirroring the pattern established by
 * Sprint 4 (Access Control) and Sprint 3 (Video Surveillance) — an in-module
 * tab strip beneath the shared TopNav/Breadcrumb. The global Sidebar/TopNav
 * are not modified; ROUTES.settings already exists and is reused as-is.
 */
export function SettingsLayout() {
  return (
    <div className="flex flex-col gap-4">
      <nav
        aria-label="Settings sections"
        className="flex flex-wrap gap-1 overflow-x-auto rounded-(--radius-lg) border border-border-default bg-surface p-1.5"
      >
        {SETTINGS_SUBNAV.map((item) => {
          const Icon = item.icon;
          const to = item.path ? `${ROUTES.settings}/${item.path}` : ROUTES.settings;
          return (
            <NavLink
              key={item.id}
              to={to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-(--radius-md) px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                  isActive
                    ? 'bg-primary-500/12 text-primary-300'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                )
              }
            >
              <Icon className="size-3.5 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <Outlet />
    </div>
  );
}
