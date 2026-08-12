import { Thermometer, Droplets, Wind, Cloud, CircleDot, Users, Zap, ShieldAlert, Wifi, WifiOff } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import {
  temperatureSensors,
  humiditySensors,
  airQualityZones,
  floorOccupancy,
  energyZones,
  environmentAlerts,
  environmentSensors,
} from '@/modules/environment-monitoring/mock';

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function OverviewCards() {
  const onlineTemp = temperatureSensors.filter((s) => s.health !== 'offline');
  const avgTemp = average(onlineTemp.map((s) => s.current));
  const avgHumidity = average(humiditySensors.map((s) => s.current));
  const avgAqi = average(airQualityZones.map((z) => z.aqi));
  const avgCo2 = average(airQualityZones.map((z) => z.co2ppm));
  const avgPm25 = average(airQualityZones.map((z) => z.pm25));
  const totalOccupancy = floorOccupancy.reduce((sum, f) => sum + f.current, 0);
  const totalEnergyKw = energyZones.reduce((sum, z) => sum + z.currentKw, 0);
  const activeAlerts = environmentAlerts.filter((a) => a.status === 'active').length;
  const onlineSensors = environmentSensors.filter((s) => s.status === 'online').length;
  const offlineSensors = environmentSensors.filter((s) => s.status === 'offline').length;

  const cards = [
    { label: 'Avg. Temperature', value: `${avgTemp.toFixed(1)}°C`, icon: Thermometer, tone: 'neutral' as const },
    { label: 'Avg. Humidity', value: `${avgHumidity.toFixed(0)}%`, icon: Droplets, tone: 'neutral' as const },
    { label: 'Air Quality Index', value: avgAqi.toFixed(0), icon: Wind, tone: avgAqi > 100 ? ('danger' as const) : ('success' as const) },
    { label: 'CO₂', value: `${avgCo2.toFixed(0)} ppm`, icon: Cloud, tone: 'neutral' as const },
    { label: 'PM2.5', value: `${avgPm25.toFixed(0)} µg/m³`, icon: CircleDot, tone: 'neutral' as const },
    { label: 'Occupancy', value: totalOccupancy, icon: Users, tone: 'neutral' as const },
    { label: 'Energy Usage', value: `${totalEnergyKw.toFixed(1)} kW`, icon: Zap, tone: 'neutral' as const },
    { label: 'Active Alerts', value: activeAlerts, icon: ShieldAlert, tone: activeAlerts > 0 ? ('danger' as const) : ('success' as const) },
    { label: 'Online Sensors', value: onlineSensors, icon: Wifi, tone: 'success' as const },
    { label: 'Offline Sensors', value: offlineSensors, icon: WifiOff, tone: offlineSensors > 0 ? ('danger' as const) : ('success' as const) },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
