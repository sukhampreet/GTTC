import { BrainCircuit, ScanFace, UserRound, Car } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { aiReportSummary } from '@/modules/reports/mock';
import { AIReportSummaryPanel } from '@/modules/reports/components/ai/AIReportSummaryPanel';

/**
 * Reports module's "AI Reports" page — the reporting-layer view of AI Analytics
 * data. Distinct from the AI Analytics module's own AIReportsPage, which lives
 * at /ai-analytics/ai-reports; this page links back to it (see Step 11).
 */
export function ReportsAIReportsPage() {
  return (
    <div>
      <PageHeader title="AI Reports" description="AI Analytics detection summary, presented through the Reports layer for cross-module reporting." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="AI Detections" value={aiReportSummary.aiDetections} icon={BrainCircuit} tone="neutral" />
        <StatCard label="Face Recognition" value={aiReportSummary.faceRecognition} icon={ScanFace} tone="neutral" />
        <StatCard label="Person Detection" value={aiReportSummary.personDetection} icon={UserRound} tone="neutral" />
        <StatCard label="Vehicle Detection" value={aiReportSummary.vehicleDetection} icon={Car} tone="neutral" />
      </div>

      <AIReportSummaryPanel />
    </div>
  );
}
