import { Camera, Wifi, BellRing, Siren, Users, Car, DoorOpen, FlameKindling, Thermometer } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { liveCameras } from '@/modules/live-monitoring/mock/liveCameras';
import { liveAlerts } from '@/modules/live-monitoring/mock/alerts';
import { liveEvents } from '@/modules/live-monitoring/mock/liveEvents';
import { accessStatusSnapshot } from '@/modules/live-monitoring/mock/access';
import { parkingStatusSnapshot } from '@/modules/live-monitoring/mock/parking';
import { fireStatusSnapshot } from '@/modules/live-monitoring/mock/fire';
import { environmentZones } from '@/modules/live-monitoring/mock/environment';
import { deviceStatusCategories } from '@/modules/live-monitoring/mock/devices';

/** SOC top-strip KPIs — the numbers an operator scans first thing. */
export function OverviewCards() {
  const onlineDevices = deviceStatusCategories.reduce((sum, d) => sum + d.online, 0);
  const activeAlerts = liveAlerts.filter((a) => !a.acknowledged).length;
  const emergencyEvents = liveEvents.filter((e) => e.priority === 'danger' && e.status === 'new').length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      <StatCard label="Live Cameras" value={liveCameras.length} icon={Camera} tone="info" hint={`${liveCameras.filter((c) => c.status === 'online').length} online`} />
      <StatCard label="Online Devices" value={onlineDevices} icon={Wifi} tone="success" />
      <StatCard label="Active Alerts" value={activeAlerts} icon={BellRing} tone="warning" />
      <StatCard label="Emergency Events" value={emergencyEvents} icon={Siren} tone="danger" />
      <StatCard label="Current Visitors" value={accessStatusSnapshot.currentEntries - accessStatusSnapshot.currentExits} icon={Users} tone="neutral" />
      <StatCard label="Vehicles Inside" value={parkingStatusSnapshot.currentVehicles} icon={Car} tone="info" />
      <StatCard label="Open Doors" value={accessStatusSnapshot.doorsOpen} icon={DoorOpen} tone="warning" />
      <StatCard label="Fire Devices Online" value={fireStatusSnapshot.smokeSensors + fireStatusSnapshot.heatSensors - fireStatusSnapshot.faultDevices} icon={FlameKindling} tone="success" />
      <StatCard label="Environment Sensors" value={environmentZones.length} icon={Thermometer} tone="neutral" />
    </div>
  );
}
