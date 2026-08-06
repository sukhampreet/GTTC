import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { GlobalSearch } from '@/layouts/topnav/GlobalSearch';
import { LiveClock } from '@/layouts/topnav/LiveClock';
import { NotificationBell } from '@/layouts/topnav/NotificationBell';
import { ProfileDropdown } from '@/layouts/topnav/ProfileDropdown';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ROUTES } from '@/constants/routes';

export function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center justify-between gap-4 border-b border-border-default bg-surface px-4">
      <div className="flex items-center gap-4">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-1.5">
        <LiveClock />
        <div className="mx-1 h-5 w-px bg-border-default" />
        <ThemeToggle />
        <button
          onClick={() => navigate(ROUTES.settings)}
          className="flex size-8 items-center justify-center rounded-(--radius-md) text-text-secondary hover:bg-surface-hover hover:text-text-primary"
          aria-label="Settings"
        >
          <Settings className="size-4" />
        </button>
        <NotificationBell />
        <div className="mx-1 h-5 w-px bg-border-default" />
        <ProfileDropdown />
      </div>
    </header>
  );
}
