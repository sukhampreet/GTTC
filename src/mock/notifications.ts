import type { NotificationItem } from '@/types/common';

export const notifications: NotificationItem[] = [
  { id: 'NTF-01', title: 'Intrusion Detected', description: 'AI engine flagged intrusion at North Perimeter.', tone: 'danger', timestamp: '2 min ago', read: false, source: 'AI Analytics' },
  { id: 'NTF-02', title: 'Camera Offline', description: 'CAM-041 (Perimeter North) has gone offline.', tone: 'warning', timestamp: '14 min ago', read: false, source: 'Video Surveillance' },
  { id: 'NTF-03', title: 'Door Held Open', description: 'Emergency Exit East has been open for 8 minutes.', tone: 'warning', timestamp: '22 min ago', read: false, source: 'Access Control' },
  { id: 'NTF-04', title: 'Firmware Update Available', description: 'New firmware v4.2.2 available for 6 cameras.', tone: 'info', timestamp: '1 hr ago', read: true, source: 'Device Management' },
  { id: 'NTF-05', title: 'Backup Completed', description: 'Nightly database backup completed successfully.', tone: 'success', timestamp: '6 hr ago', read: true, source: 'System' },
];
