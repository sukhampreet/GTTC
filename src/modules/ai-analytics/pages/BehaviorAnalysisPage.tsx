import { Activity, ShieldAlert, TrendingUp } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { behaviorEvents } from '@/modules/ai-analytics/mock';
import { BehaviorTable } from '@/modules/ai-analytics/components/behavior/BehaviorTable';

export function BehaviorAnalysisPage() {
  const suspicious = behaviorEvents.filter((e) => e.severity === 'critical' || e.severity === 'high').length;
  const abnormal = behaviorEvents.filter((e) => e.status === 'open').length;

  return (
    <div>
      <PageHeader title="Behavior Analysis" description="AI-driven detection of anomalous and suspicious behavior patterns across all zones." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Behavior Events" value={behaviorEvents.length} icon={Activity} tone="neutral" />
        <StatCard label="Suspicious Activity" value={suspicious} icon={ShieldAlert} tone={suspicious > 0 ? 'danger' : 'success'} />
        <StatCard label="Abnormal Activity" value={abnormal} icon={TrendingUp} tone={abnormal > 0 ? 'warning' : 'success'} />
      </div>

      <BehaviorTable events={behaviorEvents} />
    </div>
  );
}
