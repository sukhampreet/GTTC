import { NavLink } from 'react-router-dom';

import type { NavItem } from '@/types/navigation';
import { cn } from '@/utils/cn';

export interface SidebarNavItemProps {
  item: NavItem;
  collapsed: boolean;
}

export function SidebarNavItem({ item, collapsed }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-(--radius-md) px-2.5 py-2 text-[13px] font-medium transition-colors',
          isActive
            ? 'bg-primary-500/12 text-primary-300'
            : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
          collapsed && 'justify-center px-0',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={cn('size-4 shrink-0', isActive ? 'text-primary-400' : 'text-text-tertiary group-hover:text-text-secondary')} />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </>
      )}
    </NavLink>
  );
}
