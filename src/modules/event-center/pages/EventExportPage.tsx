import { PageHeader } from '@/components/ui/PageHeader';
import { EventExportPanel } from '@/modules/event-center/components/export/EventExportPanel';

export function EventExportPage() {
  return (
    <div>
      <PageHeader title="Event Export" description="Export filtered event records to CSV or PDF for offline review and reporting." />
      <EventExportPanel />
    </div>
  );
}
