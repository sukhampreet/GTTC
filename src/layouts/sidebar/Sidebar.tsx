import { ChevronsLeft, ChevronsRight, ShieldCheck } from 'lucide-react';

import { NAVIGATION_CONFIG } from '@/config/navigation.config';
import { SidebarNavItem } from '@/layouts/sidebar/SidebarNavItem';
import { useSidebarStore } from '@/store/sidebarStore';
import { cn } from '@/utils/cn';

export function Sidebar() {
  const collapsed = useSidebarStore((state) => state.collapsed);
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen shrink-0 flex-col border-r border-border-default bg-surface transition-[width] duration-150',
        collapsed ? 'w-(--sidebar-width-collapsed)' : 'w-(--sidebar-width)',
      )}
    >
      <div className="flex h-(--header-height) shrink-0 items-center gap-2.5 border-b border-border-default px-4">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-(--radius-md) border border-primary-600/40 bg-primary-900 text-primary-300">
          <ShieldCheck className="size-4" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-tight text-text-primary">GTTC</p>
            <p className="truncate text-[10px] leading-tight text-text-tertiary">Control Platform</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {NAVIGATION_CONFIG.map((item) => (
          <SidebarNavItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="shrink-0 border-t border-border-default p-2">
        <button
          onClick={toggle}
          className="flex w-full items-center justify-center gap-2 rounded-(--radius-md) py-2 text-xs text-text-tertiary hover:bg-surface-hover hover:text-text-primary"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
          {!collapsed && 'Collapse'}
        </button>
      </div>
    </aside>
  );
}
