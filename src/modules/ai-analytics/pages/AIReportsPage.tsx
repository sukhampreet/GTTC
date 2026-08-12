import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { ScanFace, UserCheck } from 'lucide-react';
import { recognitionStats } from '@/modules/ai-analytics/mock';
import { AiReportCharts } from '@/modules/ai-analytics/components/reports/AiReportCharts';

export function AIReportsPage() {
  return (
    <div>
      <PageHeader title="AI Reports" description="Aggregated AI analytics reporting — detection volume, alert trends and recognition statistics." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Recognitions" value={recognitionStats.totalRecognitions} icon={ScanFace} tone="neutral" />
        <StatCard label="Known Faces" value={recognitionStats.knownFaces} icon={UserCheck} tone="success" />
        <StatCard label="Unknown Faces" value={recognitionStats.unknownFaces} icon={ScanFace} tone="warning" />
        <StatCard label="Avg. Confidence" value={`${recognitionStats.averageConfidence}%`} icon={UserCheck} tone="neutral" />
      </div>

      <AiReportCharts />
    </div>
  );
}
