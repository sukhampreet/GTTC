import { BarChart3, Percent, ScanEye, TrendingUp } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { analyticsSummary } from '@/modules/video-surveillance/mock';

const ICONS = [ScanEye, Percent, BarChart3, TrendingUp];

export function AnalyticsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {analyticsSummary.map((item, i) => (
        <StatCard key={item.id} label={item.label} value={item.value} icon={ICONS[i % ICONS.length]} tone={item.tone} hint={item.hint} />
      ))}
    </div>
  );
}
