import { PageHeader } from '@/components/ui/PageHeader';
import { emergencyDoorStates, lastEmergencyTrigger } from '@/modules/access-control/mock';
import { EmergencyPanel } from '@/modules/access-control/components/emergency/EmergencyPanel';

export function EmergencyUnlockPage() {
  return (
    <div>
      <PageHeader
        title="Emergency Unlock"
        description="Facility-wide emergency override controls. All actions are logged and require confirmation."
      />
      <EmergencyPanel doors={emergencyDoorStates} lastTrigger={lastEmergencyTrigger} />
    </div>
  );
}
