import { PageHeader } from '@/components/ui/PageHeader';
import { DiagnosticsPanel } from '@/modules/device-management/components/diagnostics/DiagnosticsPanel';

export function DiagnosticsPage() {
  return (
    <div>
      <PageHeader title="Diagnostics" description="Connection status, latency, and resource diagnostics per device. UI only — no real network commands are issued." />
      <DiagnosticsPanel />
    </div>
  );
}
