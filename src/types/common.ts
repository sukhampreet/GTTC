export type StatusTone = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  tone: StatusTone;
  timestamp: string;
  read: boolean;
  source: string;
}
