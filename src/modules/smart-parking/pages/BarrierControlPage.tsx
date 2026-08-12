import { PageHeader } from '@/components/ui/PageHeader';
import { barriers } from '@/modules/smart-parking/mock';
import { BarrierControlPanel } from '@/modules/smart-parking/components/barrierControl/BarrierControlPanel';

export function BarrierControlPage() {
  const entryBarriers = barriers.filter((b) => b.direction === 'entry');
  const exitBarriers = barriers.filter((b) => b.direction === 'exit');

  return (
    <div>
      <PageHeader title="Barrier Control" description="Open, close and force-open entry and exit barriers. Every action is logged." />
      <BarrierControlPanel entryBarriers={entryBarriers} exitBarriers={exitBarriers} />
    </div>
  );
}
