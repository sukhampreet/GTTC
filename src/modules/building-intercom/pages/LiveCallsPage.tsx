import { useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/feedback/EmptyState';
import { liveCalls } from '@/modules/building-intercom/mock';
import { LiveCallPanel } from '@/modules/building-intercom/components/liveCalls/LiveCallPanel';
import { ActiveCallsList } from '@/modules/building-intercom/components/liveCalls/ActiveCallsList';

export function LiveCallsPage() {
  const [selectedId, setSelectedId] = useState(liveCalls[0]?.id ?? '');
  const selectedCall = liveCalls.find((c) => c.id === selectedId);

  return (
    <div>
      <PageHeader title="Live Calls" description="Real-time monitoring and control of intercom calls in progress." />

      {liveCalls.length === 0 ? (
        <EmptyState title="No live calls" description="There are no intercom calls in progress right now." />
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">{selectedCall && <LiveCallPanel call={selectedCall} />}</div>
          <ActiveCallsList calls={liveCalls} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      )}
    </div>
  );
}
