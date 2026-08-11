import { PageHeader } from '@/components/ui/PageHeader';
import { parkingGates, exitActivity } from '@/modules/smart-parking/mock';
import { ExitGatePanel } from '@/modules/smart-parking/components/exitGate/ExitGatePanel';
import { ExitActivityTable } from '@/modules/smart-parking/components/exitGate/ExitActivityTable';

export function ExitGatePage() {
  const exitGates = parkingGates.filter((g) => g.direction === 'exit');
  const primaryGate = exitGates[0];

  return (
    <div>
      <PageHeader title="Exit Gate" description="Live status, barrier and ANPR health for every parking exit gate." />

      <div className="space-y-4">
        {primaryGate && <ExitGatePanel gate={primaryGate} />}
        <ExitActivityTable events={exitActivity} />
      </div>
    </div>
  );
}
