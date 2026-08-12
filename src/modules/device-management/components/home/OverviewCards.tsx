import { HardDrive, Wifi, WifiOff, TriangleAlert, AlertOctagon, Wrench, Boxes, HeartPulse } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { devices } from '@/modules/device-management/mock/devices';

export function OverviewCards() {
  const total = devices.length;
  const online = devices.filter((d) => d.status === 'online').length;
  const offline = devices.filter((d) => d.status === 'offline').length;
  const warning = devices.filter((d) => d.health === 'warning').length;
  const critical = devices.filter((d) => d.health === 'critical').length;
  const maintenance = devices.filter((d) => d.health === 'maintenance').length;
  const modules = new Set(devices.map((d) => d.module)).size;
  const healthyPct = Math.round((devices.filter((d) => d.health === 'healthy').length / total) * 100);

  const cards = [
    { label: 'Total Devices', value: total, icon: HardDrive, tone: 'neutral' as const },
    { label: 'Online Devices', value: online, icon: Wifi, tone: 'success' as const },
    { label: 'Offline Devices', value: offline, icon: WifiOff, tone: offline > 0 ? ('danger' as const) : ('success' as const) },
    { label: 'Warning Devices', value: warning, icon: TriangleAlert, tone: 'warning' as const },
    { label: 'Critical Devices', value: critical, icon: AlertOctagon, tone: 'danger' as const },
    { label: 'Maintenance', value: maintenance, icon: Wrench, tone: 'info' as const },
    { label: 'Modules Covered', value: modules, icon: Boxes, tone: 'neutral' as const },
    { label: 'Fleet Health', value: `${healthyPct}%`, icon: HeartPulse, tone: healthyPct >= 80 ? ('success' as const) : ('warning' as const) },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
