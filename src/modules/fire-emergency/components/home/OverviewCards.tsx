import {
  FlameKindling,
  Thermometer,
  Siren,
  MapPinned,
  Wifi,
  WifiOff,
  Wrench,
  ShieldAlert,
  Radio,
} from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { firePanels, smokeSensors, heatSensors, mcpDevices, alarmResetQueue, paZones } from '@/modules/fire-emergency/mock';

export function OverviewCards() {
  const onlinePanels = firePanels.filter((p) => p.status === 'online').length;
  const offlinePanels = firePanels.filter((p) => p.status === 'offline').length;
  const faultDevices =
    smokeSensors.filter((s) => s.health === 'offline').length +
    heatSensors.filter((h) => h.health === 'offline').length +
    mcpDevices.filter((m) => m.status === 'fault').length;
  const activeAlarms = alarmResetQueue.filter((a) => a.status === 'active').length;
  const broadcastActive = paZones.some((z) => z.emergencyMode);

  const cards = [
    { label: 'Fire Panels', value: firePanels.length, icon: FlameKindling, tone: 'neutral' as const },
    { label: 'Smoke Sensors', value: smokeSensors.length, icon: FlameKindling, tone: 'neutral' as const },
    { label: 'Heat Sensors', value: heatSensors.length, icon: Thermometer, tone: 'neutral' as const },
    { label: 'Manual Call Points', value: mcpDevices.length, icon: Siren, tone: 'neutral' as const },
    { label: 'Alarm Zones', value: 4, icon: MapPinned, tone: 'neutral' as const },
    { label: 'Online Devices', value: onlinePanels, icon: Wifi, tone: 'success' as const },
    { label: 'Offline Devices', value: offlinePanels, icon: WifiOff, tone: 'danger' as const },
    { label: 'Fault Devices', value: faultDevices, icon: Wrench, tone: 'warning' as const },
    { label: 'Active Alarms', value: activeAlarms, icon: ShieldAlert, tone: activeAlarms > 0 ? ('danger' as const) : ('success' as const) },
    {
      label: 'Emergency Broadcast',
      value: broadcastActive ? 'Active' : 'Standby',
      icon: Radio,
      tone: broadcastActive ? ('danger' as const) : ('success' as const),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
