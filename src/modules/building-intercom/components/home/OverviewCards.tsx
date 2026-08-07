import { Building2, DoorOpen, Wifi, WifiOff, PhoneCall, PhoneMissed, Siren, PhoneIncoming } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { indoorStations, outdoorStations, callHistory, liveCalls } from '@/modules/building-intercom/mock';

export function OverviewCards() {
  const totalIndoor = indoorStations.length;
  const totalOutdoor = outdoorStations.length;
  const onlineDevices =
    indoorStations.filter((s) => s.status === 'online').length +
    outdoorStations.filter((s) => s.onlineStatus === 'online').length;
  const offlineDevices =
    indoorStations.filter((s) => s.status === 'offline').length +
    outdoorStations.filter((s) => s.onlineStatus === 'offline').length;
  const todaysCalls = callHistory.filter((c) => c.date === '2026-08-07').length;
  const missedCalls = callHistory.filter((c) => c.status === 'missed').length;
  const emergencyCalls = callHistory.filter((c) => c.status === 'emergency').length;
  const activeCalls = liveCalls.length;

  const cards = [
    { label: 'Indoor Stations', value: totalIndoor, icon: Building2, tone: 'neutral' as const },
    { label: 'Outdoor Stations', value: totalOutdoor, icon: DoorOpen, tone: 'neutral' as const },
    { label: 'Online Devices', value: onlineDevices, icon: Wifi, tone: 'success' as const },
    { label: 'Offline Devices', value: offlineDevices, icon: WifiOff, tone: 'danger' as const },
    { label: "Today's Calls", value: todaysCalls, icon: PhoneCall, tone: 'info' as const },
    { label: 'Missed Calls', value: missedCalls, icon: PhoneMissed, tone: 'warning' as const },
    { label: 'Emergency Calls', value: emergencyCalls, icon: Siren, tone: 'danger' as const },
    { label: 'Active Calls', value: activeCalls, icon: PhoneIncoming, tone: 'info' as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
