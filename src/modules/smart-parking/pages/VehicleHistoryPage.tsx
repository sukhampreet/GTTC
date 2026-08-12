import { History } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { vehicleHistory } from '@/modules/smart-parking/mock';
import { VehicleHistoryTable } from '@/modules/smart-parking/components/vehicleHistory/VehicleHistoryTable';

export function VehicleHistoryPage() {
  const ongoing = vehicleHistory.filter((v) => v.status === 'ongoing').length;

  return (
    <div>
      <PageHeader title="Vehicle History" description="Historical record of every vehicle entry and exit across the campus." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Records" value={vehicleHistory.length} icon={History} tone="neutral" />
        <StatCard label="Ongoing" value={ongoing} icon={History} tone="info" />
      </div>

      <VehicleHistoryTable entries={vehicleHistory} />
    </div>
  );
}
