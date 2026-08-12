import { ScanFace, UserCheck, UserX, Activity } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { faceRecognitionEvents, recognitionStats } from '@/modules/ai-analytics/mock';
import { FaceRecognitionTable } from '@/modules/ai-analytics/components/faceRecognition/FaceRecognitionTable';

export function FaceRecognitionPage() {
  return (
    <div>
      <PageHeader title="Face Recognition" description="Recognition events across every AI-enabled camera, matched against the known and watchlist gallery." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Recognitions" value={recognitionStats.totalRecognitions} icon={ScanFace} tone="neutral" />
        <StatCard label="Known Faces" value={recognitionStats.knownFaces} icon={UserCheck} tone="success" />
        <StatCard label="Unknown Faces" value={recognitionStats.unknownFaces} icon={UserX} tone="warning" />
        <StatCard label="Avg. Confidence" value={`${recognitionStats.averageConfidence}%`} icon={Activity} tone="neutral" />
      </div>

      <FaceRecognitionTable events={faceRecognitionEvents} />
    </div>
  );
}
