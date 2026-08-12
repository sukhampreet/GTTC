import { Cpu, PlayCircle, PauseCircle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { aiModels } from '@/modules/ai-analytics/mock';
import { ModelManagerTable } from '@/modules/ai-analytics/components/modelManager/ModelManagerTable';

export function AIModelManagerPage() {
  const running = aiModels.filter((m) => m.status === 'running').length;
  const stopped = aiModels.filter((m) => m.status !== 'running').length;

  return (
    <div>
      <PageHeader title="AI Model Manager" description="Manage the deployment state of every AI detection model registered on this platform." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Models" value={aiModels.length} icon={Cpu} tone="neutral" />
        <StatCard label="Running" value={running} icon={PlayCircle} tone="success" />
        <StatCard label="Stopped / Updating" value={stopped} icon={PauseCircle} tone="warning" />
      </div>

      <ModelManagerTable models={aiModels} />
    </div>
  );
}
