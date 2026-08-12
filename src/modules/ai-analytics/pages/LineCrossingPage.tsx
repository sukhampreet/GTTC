import { MoveHorizontal, Camera, MapPinned } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { lineCrossingEvents } from '@/modules/ai-analytics/mock';
import { LineCrossingTable } from '@/modules/ai-analytics/components/lineCrossing/LineCrossingTable';

export function LineCrossingPage() {
  const active = lineCrossingEvents.filter((e) => e.status === 'active').length;
  const cameras = new Set(lineCrossingEvents.map((e) => e.camera)).size;
  const zones = new Set(lineCrossingEvents.map((e) => e.line)).size;

  return (
    <div>
      <PageHeader title="Line Crossing" description="Virtual boundary and tripwire crossing events across every configured line." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Active Alerts" value={active} icon={MoveHorizontal} tone={active > 0 ? 'warning' : 'success'} />
        <StatCard label="Crossings Today" value={lineCrossingEvents.length} icon={MoveHorizontal} tone="neutral" />
        <StatCard label="Cameras Monitoring Lines" value={cameras} icon={Camera} tone="neutral" />
        <StatCard label="Zones" value={zones} icon={MapPinned} tone="neutral" />
      </div>

      <LineCrossingTable events={lineCrossingEvents} />
    </div>
  );
}
