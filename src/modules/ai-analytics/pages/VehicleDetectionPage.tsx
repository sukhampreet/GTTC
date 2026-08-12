import { Car, Truck, Bike, Bus } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { vehicleDetectionEvents, vehicleTypeCounts } from '@/modules/ai-analytics/mock';
import { VehicleDetectionTable } from '@/modules/ai-analytics/components/vehicleDetection/VehicleDetectionTable';

export function VehicleDetectionPage() {
  return (
    <div>
      <PageHeader title="Vehicle Detection" description="Vehicle classification and detection events across gate and parking cameras." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatCard label="Vehicle Detections" value={vehicleDetectionEvents.length} icon={Car} tone="neutral" />
        <StatCard label="Cars" value={vehicleTypeCounts.car} icon={Car} tone="neutral" />
        <StatCard label="Trucks" value={vehicleTypeCounts.truck} icon={Truck} tone="neutral" />
        <StatCard label="Motorcycles" value={vehicleTypeCounts.motorcycle} icon={Bike} tone="neutral" />
        <StatCard label="Buses" value={vehicleTypeCounts.bus} icon={Bus} tone="neutral" />
      </div>

      <VehicleDetectionTable events={vehicleDetectionEvents} />
    </div>
  );
}
