import { useLocation } from 'react-router-dom';

import { NAVIGATION_CONFIG } from '@/config/navigation.config';
import { ROUTES } from '@/constants/routes';
import type { BreadcrumbItem } from '@/types/common';

export function useBreadcrumbs(): BreadcrumbItem[] {
  const { pathname } = useLocation();

  const activeNavItem = NAVIGATION_CONFIG.find((item) => item.path === pathname);

  const items: BreadcrumbItem[] = [{ label: 'Home', path: ROUTES.dashboard }];

  if (activeNavItem && activeNavItem.path !== ROUTES.dashboard) {
    items.push({ label: activeNavItem.label });
  }

  return items;
}
