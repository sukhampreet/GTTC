import { PageHeader } from '@/components/ui/PageHeader';
import { ReportExportPanel } from '@/modules/reports/components/export/ReportExportPanel';

export function ReportExportPage() {
  return (
    <div>
      <PageHeader title="Report Export" description="Generate and export reports in PDF, CSV or Excel format for any module and date range." />
      <ReportExportPanel />
    </div>
  );
}
