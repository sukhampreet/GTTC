import { Wifi, WifiOff, AlertTriangle, Wrench, SignalHigh, BatteryMedium } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { indoorStations, outdoorStations } from '@/modules/building-intercom/mock';

export function DeviceStatusCards() {
  const allStates = [...indoorStations.map((s) => s.status), ...outdoorStations.map((s) => s.onlineStatus)];
  const online = allStates.filter((s) => s === 'online').length;
  const offline = allStates.filter((s) => s === 'offline').length;
  const fault = allStates.filter((s) => s === 'fault').length;
  const maintenance = allStates.filter((s) => s === 'maintenance').length;

  const avgSignal = Math.round(
    indoorStations.reduce((sum, s) => sum + s.signalStrengthPct, 0) / indoorStations.length,
  );

  const batteryStations = outdoorStations.filter((s) => s.batteryPct !== null);
  const avgBattery = Math.round(
    batteryStations.reduce((sum, s) => sum + (s.batteryPct ?? 0), 0) / batteryStations.length,
  );

  const cards = [
    { label: 'Online Devices', value: online, icon: Wifi, tone: 'success' as const },
    { label: 'Offline Devices', value: offline, icon: WifiOff, tone: 'danger' as const },
    { label: 'Fault Devices', value: fault, icon: AlertTriangle, tone: 'danger' as const },
    { label: 'Maintenance Devices', value: maintenance, icon: Wrench, tone: 'warning' as const },
    { label: 'Avg. Signal Quality', value: `${avgSignal}%`, icon: SignalHigh, tone: 'info' as const },
    { label: 'Avg. Battery Backup', value: `${avgBattery}%`, icon: BatteryMedium, tone: 'neutral' as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
