import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import {
  temperatureSensors,
  humiditySensors,
  airQualityZones,
  floorOccupancy,
  energyZones,
} from '@/modules/environment-monitoring/mock';

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function CurrentConditionsPanel() {
  const avgTemp = average(temperatureSensors.filter((s) => s.health !== 'offline').map((s) => s.current));
  const avgHumidity = average(humiditySensors.map((s) => s.current));
  const avgAqi = average(airQualityZones.map((z) => z.aqi));
  const avgCo2 = average(airQualityZones.map((z) => z.co2ppm));
  const avgPm25 = average(airQualityZones.map((z) => z.pm25));
  const totalOccupancy = floorOccupancy.reduce((sum, f) => sum + f.current, 0);
  const totalEnergyKw = energyZones.reduce((sum, z) => sum + z.currentKw, 0);

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Current Conditions</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        <Reading label="Temperature" value={`${avgTemp.toFixed(1)}°C`} />
        <Reading label="Humidity" value={`${avgHumidity.toFixed(0)}%`} />
        <Reading label="AQI" value={avgAqi.toFixed(0)} />
        <Reading label="CO₂" value={`${avgCo2.toFixed(0)} ppm`} />
        <Reading label="PM2.5" value={`${avgPm25.toFixed(0)} µg/m³`} />
        <Reading label="Occupancy" value={totalOccupancy} />
        <Reading label="Energy" value={`${totalEnergyKw.toFixed(1)} kW`} />
      </AppCardContent>
    </AppCard>
  );
}

function Reading({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-2 text-center">
      <p className="text-[10px] uppercase tracking-wide text-text-tertiary">{label}</p>
      <p className="mt-0.5 text-[13px] font-semibold tabular-nums text-text-primary">{value}</p>
    </div>
  );
}
