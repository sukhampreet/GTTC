import type { LucideIcon } from 'lucide-react';

export interface NavChildItem {
  id: string;
  label: string;
  path: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  children?: NavChildItem[];
}
