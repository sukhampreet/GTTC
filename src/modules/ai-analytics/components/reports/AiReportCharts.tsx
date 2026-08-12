import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { detectionTrend7d, detectionByType, detectionByCamera, detectionByLocation, alertTrend7d } from '@/modules/ai-analytics/mock';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';
const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: 4,
  fontSize: 12,
  color: 'var(--color-text-primary)',
};

export function AiReportCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <AppCard>
        <AppCardHeader><AppCardTitle>Daily / Weekly AI Detections</AppCardTitle></AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={detectionTrend7d} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
              <Line type="monotone" dataKey="detections" name="Detections" stroke="var(--color-primary-500)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader><AppCardTitle>Alert Trends</AppCardTitle></AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={alertTrend7d} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
              <Line type="monotone" dataKey="alerts" name="Alerts" stroke="var(--color-danger-500)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader><AppCardTitle>Detection by Type</AppCardTitle></AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <Pie data={detectionByType} dataKey="value" nameKey="category" innerRadius="55%" outerRadius="80%" paddingAngle={2} strokeWidth={0}>
                {detectionByType.map((entry) => <Cell key={entry.category} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
            </PieChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader><AppCardTitle>Detection by Camera</AppCardTitle></AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={detectionByCamera} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
              <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="camera" tick={AXIS_TICK} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--color-bg-surface-hover)' }} />
              <Bar dataKey="value" name="Detections" radius={[0, 3, 3, 0]} fill="var(--color-primary-500)" />
            </BarChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>

      <AppCard className="lg:col-span-2">
        <AppCardHeader><AppCardTitle>Detection by Location</AppCardTitle></AppCardHeader>
        <AppCardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={detectionByLocation} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="location" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} interval={0} angle={-12} textAnchor="end" height={50} />
              <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="value" name="Detections" fill="var(--color-accent-500)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
