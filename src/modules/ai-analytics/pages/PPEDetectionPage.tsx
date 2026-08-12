import { HardHat, ShieldAlert, Shirt, AlertTriangle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { ppeDetectionEvents } from '@/modules/ai-analytics/mock';
import { PPEDetectionTable } from '@/modules/ai-analytics/components/ppe/PPEDetectionTable';

export function PPEDetectionPage() {
  const violations = ppeDetectionEvents.filter((e) => e.status !== 'resolved').length;
  const helmetViolations = ppeDetectionEvents.filter((e) => e.violation === 'helmet').length;
  const vestViolations = ppeDetectionEvents.filter((e) => e.violation === 'vest').length;
  const compliance = Math.round((1 - ppeDetectionEvents.length / (ppeDetectionEvents.length + 120)) * 100);

  return (
    <div>
      <PageHeader title="PPE Detection" description="Personal protective equipment compliance monitoring across warehouse, lab and site cameras." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="PPE Compliance" value={`${compliance}%`} icon={HardHat} tone="success" />
        <StatCard label="Violations" value={violations} icon={ShieldAlert} tone={violations > 0 ? 'warning' : 'success'} />
        <StatCard label="Helmet Violations" value={helmetViolations} icon={AlertTriangle} tone="warning" />
        <StatCard label="Vest Violations" value={vestViolations} icon={Shirt} tone="warning" />
      </div>

      <PPEDetectionTable events={ppeDetectionEvents} />
    </div>
  );
}
