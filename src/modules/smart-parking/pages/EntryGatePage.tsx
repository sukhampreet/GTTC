import { PageHeader } from '@/components/ui/PageHeader';
import { parkingGates, entryActivity } from '@/modules/smart-parking/mock';
import { EntryGatePanel } from '@/modules/smart-parking/components/entryGate/EntryGatePanel';
import { EntryActivityTable } from '@/modules/smart-parking/components/entryGate/EntryActivityTable';

export function EntryGatePage() {
  const entryGates = parkingGates.filter((g) => g.direction === 'entry');
  const primaryGate = entryGates[0];

  return (
    <div>
      <PageHeader title="Entry Gate" description="Live status, barrier and ANPR health for every parking entry gate." />

      <div className="space-y-4">
        {primaryGate && <EntryGatePanel gate={primaryGate} />}
        <EntryActivityTable events={entryActivity} />
      </div>
    </div>
  );
}
