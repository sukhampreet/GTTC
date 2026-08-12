import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import {
  temperatureHistory,
  humidityHistory,
  aqiHistory,
  co2History,
  energyHistory,
  occupancyHistory,
} from '@/modules/environment-monitoring/mock';
import type { TrendPoint } from '@/modules/environment-monitoring/types';

const AXIS_TICK = { fontSize: 11, fill: 'var(--color-text-tertiary)' };
const GRID_STROKE = 'var(--color-border)';
const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border)',
  borderRadius: 6,
  fontSize: 12,
};

function LineCard({ title, data, color, unit }: { title: string; data: TrendPoint[]; color: string; unit: string }) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>{title}</AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis dataKey="label" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={34} unit={unit} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="value" name={title} stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}

function AreaCard({ title, data, color, unit }: { title: string; data: TrendPoint[]; color: string; unit: string }) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>{title}</AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis dataKey="label" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={34} unit={unit} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="value" name={title} stroke={color} fill={color} fillOpacity={0.15} />
          </AreaChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}

export function HistoricalCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <LineCard title="Temperature" data={temperatureHistory} color="var(--color-primary-500)" unit="°C" />
      <LineCard title="Humidity" data={humidityHistory} color="var(--color-accent-500)" unit="%" />
      <AreaCard title="Air Quality Index" data={aqiHistory} color="var(--color-warning-500)" unit="" />
      <AreaCard title="CO₂" data={co2History} color="var(--color-info-500)" unit=" ppm" />
      <LineCard title="Energy Usage" data={energyHistory} color="var(--color-success-500)" unit=" kWh" />
      <AreaCard title="Occupancy" data={occupancyHistory} color="var(--color-danger-500)" unit="" />
    </div>
  );
}
