import type { NotificationCategorySetting } from '@/modules/settings/types';

export const notificationCategories: NotificationCategorySetting[] = [
  { id: 'critical', label: 'Critical Alerts', email: true, sms: true, push: true },
  { id: 'fire', label: 'Fire Alerts', email: true, sms: true, push: true },
  { id: 'access', label: 'Access Alerts', email: true, sms: false, push: true },
  { id: 'ai', label: 'AI Alerts', email: true, sms: false, push: true },
  { id: 'device-offline', label: 'Device Offline Alerts', email: true, sms: false, push: false },
  { id: 'environment', label: 'Environment Alerts', email: false, sms: false, push: true },
  { id: 'parking', label: 'Parking Alerts', email: false, sms: false, push: true },
  { id: 'cybersecurity', label: 'Cybersecurity Alerts', email: true, sms: true, push: true },
];
