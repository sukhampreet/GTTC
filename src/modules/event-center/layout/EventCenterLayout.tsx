import { NavLink, Outlet } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { EVENT_CENTER_SUBNAV } from '@/modules/event-center/constants/subnav';

/**
 * Module-local secondary navigation. The global Sidebar only renders
 * top-level modules, so Event Center's pages are exposed here as an
 * in-module tab strip beneath the shared TopNav/Breadcrumb — the same
 * pattern used by every other module (see Fire & Emergency, Smart Parking).
 * The global Sidebar/TopNav/Breadcrumb components are not modified.
 */
export function EventCenterLayout() {
  return (
    <div className="flex flex-col gap-4">
      <nav
        aria-label="Event Center sections"
        className="flex flex-wrap gap-1 overflow-x-auto rounded-(--radius-lg) border border-border-default bg-surface p-1.5"
      >
        {EVENT_CENTER_SUBNAV.map((item) => {
          const Icon = item.icon;
          const to = item.path ? `${ROUTES.eventCenter}/${item.path}` : ROUTES.eventCenter;
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
