import { PageHeader } from '@/components/ui/PageHeader';
import { callHistory } from '@/modules/building-intercom/mock';
import { CallHistoryTable } from '@/modules/building-intercom/components/callHistory/CallHistoryTable';

export function CallHistoryPage() {
  return (
    <div>
      <PageHeader title="Call History" description="Chronological record of every intercom call across indoor and outdoor stations." />
      <CallHistoryTable calls={callHistory} />
    </div>
  );
}
