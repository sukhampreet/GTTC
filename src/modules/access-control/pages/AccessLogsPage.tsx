import { PageHeader } from '@/components/ui/PageHeader';
import { accessLogs } from '@/modules/access-control/mock';
import { AccessLogsTable } from '@/modules/access-control/components/logs/AccessLogsTable';

export function AccessLogsPage() {
  return (
    <div>
      <PageHeader title="Access Logs" description="Chronological record of every access event across all doors and buildings." />
      <AccessLogsTable logs={accessLogs} />
    </div>
  );
}
