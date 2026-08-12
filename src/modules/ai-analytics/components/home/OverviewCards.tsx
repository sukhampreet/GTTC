import { ScanFace, UserRound, Car, ShieldAlert, Users, HardHat, BrainCircuit, BellRing, Camera, Activity } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import {
  faceRecognitionEvents,
  personDetectionEvents,
  vehicleDetectionEvents,
  intrusionEvents,
  crowdZones,
  ppeDetectionEvents,
  aiAlerts,
  cameraAiStatuses,
} from '@/modules/ai-analytics/mock';

export function OverviewCards() {
  const totalDetections =
    faceRecognitionEvents.length + personDetectionEvents.length + vehicleDetectionEvents.length + intrusionEvents.length;
  const detectionsToday = totalDetections;
  const activeAlerts = aiAlerts.filter((a) => a.status === 'active').length;
  const personDetections = personDetectionEvents.reduce((sum, p) => sum + p.count, 0);
  const vehicleDetections = vehicleDetectionEvents.length;
  const faceDetections = faceRecognitionEvents.length;
  const intrusionAlerts = intrusionEvents.filter((e) => e.status === 'active').length;
  const crowdAlerts = crowdZones.filter((z) => z.density === 'high' || z.density === 'critical').length;
  const ppeViolations = ppeDetectionEvents.filter((p) => p.status !== 'resolved').length;
  const aiEnabledCameras = cameraAiStatuses.filter((c) => c.processing).length;
  const processingStatus = `${aiEnabledCameras}/${cameraAiStatuses.length} Active`;

  const cards = [
    { label: 'Total AI Detections', value: totalDetections, icon: BrainCircuit, tone: 'neutral' as const },
    { label: 'Detections Today', value: detectionsToday, icon: Activity, tone: 'neutral' as const },
    { label: 'Active AI Alerts', value: activeAlerts, icon: BellRing, tone: activeAlerts > 0 ? ('danger' as const) : ('success' as const) },
    { label: 'Person Detections', value: personDetections, icon: UserRound, tone: 'neutral' as const },
    { label: 'Vehicle Detections', value: vehicleDetections, icon: Car, tone: 'neutral' as const },
    { label: 'Face Detections', value: faceDetections, icon: ScanFace, tone: 'neutral' as const },
    { label: 'Intrusion Alerts', value: intrusionAlerts, icon: ShieldAlert, tone: intrusionAlerts > 0 ? ('danger' as const) : ('success' as const) },
    { label: 'Crowd Alerts', value: crowdAlerts, icon: Users, tone: crowdAlerts > 0 ? ('warning' as const) : ('success' as const) },
    { label: 'PPE Violations', value: ppeViolations, icon: HardHat, tone: ppeViolations > 0 ? ('warning' as const) : ('success' as const) },
    { label: 'AI Enabled Cameras', value: aiEnabledCameras, icon: Camera, tone: 'success' as const },
    { label: 'AI Processing Status', value: processingStatus, icon: BrainCircuit, tone: 'success' as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
