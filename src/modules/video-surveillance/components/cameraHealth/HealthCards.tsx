import { HeartPulse, ShieldAlert, TriangleAlert, VideoOff } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { cameraHealthRecords } from '@/modules/video-surveillance/mock';

export function HealthCards() {
  const healthy = cameraHealthRecords.filter((h) => h.state === 'healthy').length;
  const warning = cameraHealthRecords.filter((h) => h.state === 'warning').length;
  const critical = cameraHealthRecords.filter((h) => h.state === 'critical').length;
  const offline = cameraHealthRecords.filter((h) => h.state === 'offline').length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Healthy Cameras" value={healthy} icon={HeartPulse} tone="success" />
      <StatCard label="Warning" value={warning} icon={TriangleAlert} tone="warning" />
      <StatCard label="Critical" value={critical} icon={ShieldAlert} tone="danger" />
      <StatCard label="Offline Cameras" value={offline} icon={VideoOff} tone="neutral" />
    </div>
  );
}
