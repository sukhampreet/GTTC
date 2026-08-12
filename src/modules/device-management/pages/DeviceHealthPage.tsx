import { PageHeader } from '@/components/ui/PageHeader';
import { DeviceHealthCharts } from '@/modules/device-management/components/health/DeviceHealthCharts';

export function DeviceHealthPage() {
  return (
    <div>
      <PageHeader title="Device Health" description="Fleet-wide health distribution, module breakdown, and 7-day health trend." />
      <DeviceHealthCharts />
    </div>
  );
}
