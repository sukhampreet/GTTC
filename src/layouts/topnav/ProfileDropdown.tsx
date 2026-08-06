import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate(ROUTES.login, { replace: true });
  }

  if (!currentUser) return null;

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-(--radius-md) py-1 pl-1 pr-2 hover:bg-surface-hover"
      >
        <Avatar initials={currentUser.avatarInitials} size="sm" />
        <div className="hidden text-left leading-tight sm:block">
          <p className="text-xs font-medium text-text-primary">{currentUser.fullName}</p>
          <p className="text-[10px] text-text-tertiary">{role}</p>
        </div>
        <ChevronDown className="size-3.5 text-text-tertiary" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-(--radius-lg) border border-border-default bg-surface shadow-(--shadow-token-lg) animate-fade-in">
          <div className="border-b border-border-default px-3 py-2.5">
            <p className="text-xs font-medium text-text-primary">{currentUser.fullName}</p>
            <p className="truncate text-[11px] text-text-tertiary">{currentUser.email}</p>
          </div>
          <div className="p-1">
            <button className="flex w-full items-center gap-2 rounded-(--radius-sm) px-2.5 py-2 text-left text-xs text-text-secondary hover:bg-surface-hover hover:text-text-primary">
              <UserCircle className="size-4" />
              My Profile
            </button>
            <button
              onClick={() => navigate(ROUTES.settings)}
              className="flex w-full items-center gap-2 rounded-(--radius-sm) px-2.5 py-2 text-left text-xs text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            >
              <Settings className="size-4" />
              Settings
            </button>
          </div>
          <div className="border-t border-border-default p-1">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-(--radius-sm) px-2.5 py-2 text-left text-xs text-danger-400 hover:bg-danger-bg"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
