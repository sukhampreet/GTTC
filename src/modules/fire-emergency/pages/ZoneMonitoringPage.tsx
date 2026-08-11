import { PageHeader } from '@/components/ui/PageHeader';
import { zoneMonitoring } from '@/modules/fire-emergency/mock';
import { ZoneCards } from '@/modules/fire-emergency/components/zones/ZoneCards';

export function ZoneMonitoringPage() {
  return (
    <div>
      <PageHeader title="Zone Monitoring" description="Live status, temperature and smoke readings for each fire alarm zone." />
      <ZoneCards zones={zoneMonitoring} />
    </div>
  );
}
