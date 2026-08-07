import { PageHeader } from '@/components/ui/PageHeader';
import { FireWidget } from '@/modules/live-monitoring/components/fire/FireWidget';

export function LiveFireStatusPage() {
  return (
    <div>
      <PageHeader title="Live Fire Status" description="Zone-level smoke and heat sensor monitoring with active alarm and fault visibility." />
      <FireWidget />
    </div>
  );
}
