import { PageHeader } from '@/components/ui/PageHeader';
import { NetworkDevicesTable } from '@/modules/device-management/components/network/NetworkDevicesTable';

export function NetworkDevicesPage() {
  return (
    <div>
      <PageHeader title="Network Devices" description="Network-level visibility across every IP-connected device — bandwidth, latency, and reachability." />
      <NetworkDevicesTable />
    </div>
  );
}
