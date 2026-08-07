import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { environmentZones } from '@/modules/live-monitoring/mock/environment';
import { DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE } from '@/modules/live-monitoring/components/shared/statusTone';

/** Environment sensor readings by zone — temperature, humidity, AQI, CO2, PM2.5, noise, power. */
export function EnvironmentWidget() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {environmentZones.map((zone) => (
        <AppCard key={zone.id}>
          <AppCardHeader>
            <AppCardTitle>{zone.zone}</AppCardTitle>
            <StatusBadge tone={DEVICE_STATUS_TONE[zone.status]}>{DEVICE_STATUS_LABEL[zone.status]}</StatusBadge>
          </AppCardHeader>
          <AppCardContent className="grid grid-cols-4 gap-2">
            <Reading label="Temperature" value={`${zone.temperatureC.toFixed(1)}°C`} />
            <Reading label="Humidity" value={`${zone.humidityPct}%`} />
            <Reading label="AQI" value={zone.aqi} />
            <Reading label="CO₂" value={`${zone.co2ppm} ppm`} />
            <Reading label="PM2.5" value={`${zone.pm25} µg/m³`} />
            <Reading label="Noise" value={`${zone.noiseDb} dB`} />
            <Reading label="Power" value={`${zone.powerKw.toFixed(1)} kW`} />
          </AppCardContent>
        </AppCard>
      ))}
    </div>
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
