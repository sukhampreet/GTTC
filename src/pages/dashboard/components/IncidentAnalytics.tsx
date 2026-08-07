import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ROUTES } from '@/constants/routes';
import { incidentTrend, moduleDistribution, severityDistribution, weeklyStats } from '@/mock/dashboard';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';

const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)',
  border: '1px solid var(--color-border-strong)',
  borderRadius: 4,
  fontSize: 12,
  color: 'var(--color-text-primary)',
};

export function IncidentAnalytics() {
  const navigate = useNavigate();

  return (
    <section>
      <SectionHeader title="Incident Analytics" />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Incident Trends</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incidentsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-danger-500)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-danger-500)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="resolvedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-success-500)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-success-500)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
                <Area type="monotone" dataKey="incidents" name="Incidents" stroke="var(--color-danger-500)" fill="url(#incidentsFill)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="var(--color-success-500)" fill="url(#resolvedFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Weekly Statistics</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyStats} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                <XAxis dataKey="day" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
                <Line type="monotone" dataKey="events" name="Events" stroke="var(--color-primary-500)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="alerts" name="Alerts" stroke="var(--color-accent-500)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Module Distribution</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleDistribution} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="module"
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  width={110}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--color-bg-surface-hover)' }} />
                <Bar
                  dataKey="value"
                  name="Events"
                  radius={[0, 3, 3, 0]}
                  onClick={(data: { payload?: { module?: string } }) => {
                    if (data?.payload?.module === 'Access Control') navigate(ROUTES.accessControl);
                  }}
                >
                  {moduleDistribution.map((entry) => (
                    <Cell
                      key={entry.module}
                      fill={entry.color}
                      cursor={entry.module === 'Access Control' ? 'pointer' : 'default'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Alert Severity</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                <Pie
                  data={severityDistribution}
                  dataKey="value"
                  nameKey="severity"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {severityDistribution.map((entry) => (
                    <Cell key={entry.severity} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--color-text-secondary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </AppCardContent>
        </AppCard>
      </div>
    </section>
  );
}
