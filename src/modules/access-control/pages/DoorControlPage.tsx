import { PageHeader } from '@/components/ui/PageHeader';
import { doorLiveStatus, controllerRecords } from '@/modules/access-control/mock';
import { DoorControlPanel } from '@/modules/access-control/components/doorControl/DoorControlPanel';

export function DoorControlPage() {
  return (
    <div>
      <PageHeader
        title="Door Control"
        description="Remotely open, close, lock or unlock doors. All actions are UI-only mock controls in this sprint."
      />
      <DoorControlPanel doors={doorLiveStatus} controllers={controllerRecords} />
    </div>
  );
}
