import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import type { AttendanceTrendPoint } from '@/modules/access-control/types';

export interface AttendanceChartsProps {
  daily: AttendanceTrendPoint[];
  weekly: AttendanceTrendPoint[];
}

function TrendChart({ title, data }: { title: string; data: AttendanceTrendPoint[] }) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>{title}</AppCardTitle>
      </AppCardHeader>
      <AppCardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={{ stroke: 'var(--color-border)' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{
                background: 'var(--color-bg-surface-raised)',
                border: '1px solid var(--color-border)',
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="present" name="Present" fill="var(--color-success-500)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="late" name="Late" fill="var(--color-warning-500)" radius={[2, 2, 0, 0]} />
            <Bar dataKey="absent" name="Absent" fill="var(--color-danger-500)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}

export function AttendanceCharts({ daily, weekly }: AttendanceChartsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <TrendChart title="Daily Attendance Trend" data={daily} />
      <TrendChart title="Weekly Attendance Trend" data={weekly} />
    </div>
  );
}
