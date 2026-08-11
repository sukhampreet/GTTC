import { Wind, Cloud, CircleDot } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { airQualityZones } from '@/modules/environment-monitoring/mock';
import { AirQualityTable } from '@/modules/environment-monitoring/components/airQuality/AirQualityTable';

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function AirQualityPage() {
  const avgAqi = average(airQualityZones.map((z) => z.aqi));
  const avgCo2 = average(airQualityZones.map((z) => z.co2ppm));
  const avgPm25 = average(airQualityZones.map((z) => z.pm25));
  const avgPm10 = average(airQualityZones.map((z) => z.pm10));
  const avgVoc = average(airQualityZones.map((z) => z.voc));

  return (
    <div>
      <PageHeader title="Air Quality" description="AQI, CO₂, particulate matter and VOC levels across every monitored zone." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="AQI" value={avgAqi.toFixed(0)} icon={Wind} tone={avgAqi > 100 ? 'danger' : 'success'} />
        <StatCard label="CO₂" value={`${avgCo2.toFixed(0)} ppm`} icon={Cloud} tone="neutral" />
        <StatCard label="PM2.5" value={`${avgPm25.toFixed(0)} µg/m³`} icon={CircleDot} tone="neutral" />
        <StatCard label="PM10" value={`${avgPm10.toFixed(0)} µg/m³`} icon={CircleDot} tone="neutral" />
        <StatCard label="VOC" value={`${avgVoc.toFixed(2)} ppm`} icon={Wind} tone="neutral" />
      </div>

      <AirQualityTable zones={airQualityZones} />
    </div>
  );
}
