import {
  DoorOpen,
  Wifi,
  WifiOff,
  LogIn,
  LogOut,
  ShieldAlert,
  Ban,
  Siren,
  ScanFace,
  CreditCard,
} from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { doorLiveStatus, controllerRecords, accessLogs, emergencyDoorStates, faceDeviceCount, cardReaderCount } from '@/modules/access-control/mock';

export function OverviewCards() {
  const totalDoors = doorLiveStatus.length;
  const onlineControllers = controllerRecords.filter((c) => c.status === 'online').length;
  const offlineControllers = controllerRecords.filter((c) => c.status === 'offline').length;
  const todaysEntries = accessLogs.filter((l) => l.direction === 'in' && l.status === 'granted').length;
  const todaysExits = accessLogs.filter((l) => l.direction === 'out' && l.status === 'granted').length;
  const unauthorizedAttempts = accessLogs.filter((l) => l.status === 'denied' || l.status === 'forced').length;
  const blockedAccess = accessLogs.filter((l) => l.status === 'denied').length;
  const emergencyActive = emergencyDoorStates.some((d) => d.unlocked);

  const cards = [
    { label: 'Total Doors', value: totalDoors, icon: DoorOpen, tone: 'neutral' as const },
    { label: 'Online Controllers', value: onlineControllers, icon: Wifi, tone: 'success' as const },
    { label: 'Offline Controllers', value: offlineControllers, icon: WifiOff, tone: 'danger' as const },
    { label: "Today's Entries", value: todaysEntries, icon: LogIn, tone: 'info' as const },
    { label: "Today's Exits", value: todaysExits, icon: LogOut, tone: 'info' as const },
    { label: 'Unauthorized Attempts', value: unauthorizedAttempts, icon: ShieldAlert, tone: 'warning' as const },
    { label: 'Blocked Access', value: blockedAccess, icon: Ban, tone: 'danger' as const },
    {
      label: 'Emergency Unlock',
      value: emergencyActive ? 'Active' : 'Normal',
      icon: Siren,
      tone: emergencyActive ? ('danger' as const) : ('success' as const),
    },
    { label: 'Face Devices', value: faceDeviceCount, icon: ScanFace, tone: 'neutral' as const },
    { label: 'Card Readers', value: cardReaderCount, icon: CreditCard, tone: 'neutral' as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
