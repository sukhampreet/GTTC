import { PageHeader } from '@/components/ui/PageHeader';
import { EnvironmentWidget } from '@/modules/live-monitoring/components/environment/EnvironmentWidget';

export function LiveEnvironmentStatusPage() {
  return (
    <div>
      <PageHeader title="Live Environment Status" description="Real-time temperature, humidity, air quality and power readings by zone." />
      <EnvironmentWidget />
    </div>
  );
}
