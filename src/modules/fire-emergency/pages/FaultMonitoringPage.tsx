import { Wrench, ShieldAlert } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { faultEntries } from '@/modules/fire-emergency/mock';
import { FaultTable } from '@/modules/fire-emergency/components/faults/FaultTable';

export function FaultMonitoringPage() {
  const open = faultEntries.filter((f) => f.status === 'open').length;
  const critical = faultEntries.filter((f) => f.priority === 'critical').length;

  return (
    <div>
      <PageHeader title="Fault Monitoring" description="Track and assign device faults across the fire & emergency network." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Faults" value={faultEntries.length} icon={Wrench} tone="neutral" />
        <StatCard label="Open" value={open} icon={Wrench} tone="warning" />
        <StatCard label="Critical" value={critical} icon={ShieldAlert} tone="danger" />
      </div>

      <FaultTable faults={faultEntries} />
    </div>
  );
}
