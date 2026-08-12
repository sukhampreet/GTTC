import { PageHeader } from '@/components/ui/PageHeader';
import { sampleReportDetail } from '@/modules/reports/mock';
import { ReportDetailView } from '@/modules/reports/components/details/ReportDetailView';

export function ReportDetailsPage() {
  return (
    <div>
      <PageHeader title="Report Details" description="Full detail view for a generated report, including summary, statistics and notes." />
      <ReportDetailView report={sampleReportDetail} />
    </div>
  );
}
