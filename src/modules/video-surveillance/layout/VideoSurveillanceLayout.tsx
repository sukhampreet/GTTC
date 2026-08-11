import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { VIDEO_SURVEILLANCE_SUBNAV } from '@/modules/video-surveillance/constants/subnav';
import { VIDEO_SURVEILLANCE_PATHS } from '@/modules/video-surveillance/constants/paths';

/**
 * Module-local secondary navigation. Sprint 1's global Sidebar only renders
 * top-level modules, so Video Surveillance's pages are exposed here as an
 * in-module tab strip beneath the shared TopNav/Breadcrumb — the same
 * pattern enterprise consoles (HikCentral, DSS) use for module sub-menus.
 * The global Sidebar/TopNav/Breadcrumb components are not modified.
 */
export function VideoSurveillanceLayout() {
  const location = useLocation();
  const isAiDetectionSection = location.pathname.includes(
    `${ROUTES.videoSurveillance}/${VIDEO_SURVEILLANCE_PATHS.aiDetection}`,
  );

  return (
    <div className="flex flex-col gap-4">
      <nav
        aria-label="Video Surveillance sections"
        className="flex flex-wrap gap-1 overflow-x-auto rounded-(--radius-lg) border border-border-default bg-surface p-1.5"
      >
        {VIDEO_SURVEILLANCE_SUBNAV.map((item) => {
          const Icon = item.icon;
          const to = item.path ? `${ROUTES.videoSurveillance}/${item.path}` : ROUTES.videoSurveillance;
          const active = item.id === 'ai-detection' ? isAiDetectionSection : undefined;
          return (
            <NavLink
              key={item.id}
              to={to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-(--radius-md) px-2.5 py-1.5 text-[12px] font-medium transition-colors',
                  (active ?? isActive)
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
