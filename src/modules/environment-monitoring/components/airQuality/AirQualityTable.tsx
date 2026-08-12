import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/environment-monitoring/components/shared/DataTable';
import { AIR_QUALITY_TONE, DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, titleCase } from '@/modules/environment-monitoring/components/shared/statusTone';
import type { AirQualityReading } from '@/modules/environment-monitoring/types';

export interface AirQualityTableProps {
  zones: AirQualityReading[];
}

const columns: DataTableColumn<AirQualityReading>[] = [
  { id: 'zone', header: 'Zone', cell: (r) => r.zone, sortAccessor: (r) => r.zone },
  { id: 'aqi', header: 'AQI', cell: (r) => <span className="tabular-nums">{r.aqi}</span>, sortAccessor: (r) => r.aqi, align: 'right' },
  { id: 'co2ppm', header: 'CO₂', cell: (r) => <span className="tabular-nums">{r.co2ppm} ppm</span>, sortAccessor: (r) => r.co2ppm, align: 'right' },
  { id: 'pm25', header: 'PM2.5', cell: (r) => <span className="tabular-nums">{r.pm25} µg/m³</span>, sortAccessor: (r) => r.pm25, align: 'right' },
  { id: 'pm10', header: 'PM10', cell: (r) => <span className="tabular-nums">{r.pm10} µg/m³</span>, sortAccessor: (r) => r.pm10, align: 'right' },
  { id: 'voc', header: 'VOC', cell: (r) => <span className="tabular-nums">{r.voc.toFixed(2)} ppm</span>, sortAccessor: (r) => r.voc, align: 'right' },
  {
    id: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge tone={AIR_QUALITY_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>,
    sortAccessor: (r) => r.status,
  },
  {
    id: 'health',
    header: 'Health',
    cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.health]}>{DEVICE_STATUS_LABEL[r.health]}</StatusBadge>,
    sortAccessor: (r) => r.health,
  },
];

export function AirQualityTable({ zones }: AirQualityTableProps) {
  return (
    <DataTable
      data={zones}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => r.zone}
      searchPlaceholder="Search by zone…"
      pageSize={8}
      emptyTitle="No air quality zones found"
      emptyDescription="No zones match the current search."
    />
  );
}
