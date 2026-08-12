import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { aiReportSummary } from '@/modules/reports/mock';

const AXIS_TICK = { fill: 'var(--color-text-tertiary)', fontSize: 11 };
const GRID_STROKE = 'var(--color-border-default)';
const TOOLTIP_STYLE = {
  background: 'var(--color-bg-surface-raised)', border: '1px solid var(--color-border-strong)',
  borderRadius: 4, fontSize: 12, color: 'var(--color-text-primary)',
};

const data = [
  { name: 'Face Recognition', value: aiReportSummary.faceRecognition },
  { name: 'Person', value: aiReportSummary.personDetection },
  { name: 'Vehicle', value: aiReportSummary.vehicleDetection },
  { name: 'Intrusion', value: aiReportSummary.intrusion },
  { name: 'Crowd', value: aiReportSummary.crowd },
  { name: 'PPE', value: aiReportSummary.ppe },
  { name: 'Behavior', value: aiReportSummary.behavior },
];

/** Uses the same detection categories as the AI Analytics module for terminology consistency. */
export function AIReportSummaryPanel() {
  const navigate = useNavigate();

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>AI Detection Breakdown</AppCardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.aiAnalytics)}>
          Open AI Analytics
          <ArrowRight className="size-3.5" />
        </Button>
      </AppCardHeader>
      <AppCardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis dataKey="name" tick={AXIS_TICK} axisLine={{ stroke: GRID_STROKE }} tickLine={false} interval={0} angle={-12} textAnchor="end" height={50} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} width={40} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--color-bg-surface-hover)' }} />
            <Bar dataKey="value" name="Detections" fill="var(--color-primary-500)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </AppCardContent>
    </AppCard>
  );
}
