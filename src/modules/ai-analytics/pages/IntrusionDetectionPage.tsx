import { ShieldAlert, CheckCircle2, MapPinned } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { intrusionEvents } from '@/modules/ai-analytics/mock';
import { IntrusionTable } from '@/modules/ai-analytics/components/intrusion/IntrusionTable';

export function IntrusionDetectionPage() {
  const active = intrusionEvents.filter((e) => e.status === 'active').length;
  const resolved = intrusionEvents.filter((e) => e.status === 'resolved').length;
  const zones = new Set(intrusionEvents.map((e) => e.zone)).size;

  return (
    <div>
      <PageHeader title="Intrusion Detection" description="Perimeter and restricted-zone intrusion events flagged by AI analytics." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Active Intrusions" value={active} icon={ShieldAlert} tone={active > 0 ? 'danger' : 'success'} />
        <StatCard label="Intrusions Today" value={intrusionEvents.length} icon={ShieldAlert} tone="neutral" />
        <StatCard label="Resolved Incidents" value={resolved} icon={CheckCircle2} tone="success" />
        <StatCard label="Detection Zones" value={zones} icon={MapPinned} tone="neutral" />
      </div>

      <IntrusionTable events={intrusionEvents} />
    </div>
  );
}
