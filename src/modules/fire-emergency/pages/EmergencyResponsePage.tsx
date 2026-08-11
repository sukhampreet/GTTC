import { PageHeader } from '@/components/ui/PageHeader';
import {
  currentEmergencyLevel,
  emergencyResponseTeam,
  nearestExit,
  nearestCamera,
  assemblyPoint,
  incidentTimeline,
  emergencyChecklist,
} from '@/modules/fire-emergency/mock';
import { EmergencyResponsePanel } from '@/modules/fire-emergency/components/emergencyResponse/EmergencyResponsePanel';

export function EmergencyResponsePage() {
  return (
    <div>
      <PageHeader title="Emergency Response" description="Coordinated response workflow for the active incident." />
      <EmergencyResponsePanel
        level={currentEmergencyLevel}
        team={emergencyResponseTeam}
        nearestExit={nearestExit}
        nearestCamera={nearestCamera}
        assemblyPoint={assemblyPoint}
        timeline={incidentTimeline}
        checklist={emergencyChecklist}
      />
    </div>
  );
}
