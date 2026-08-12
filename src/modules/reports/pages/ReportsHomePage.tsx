import { PageHeader } from '@/components/ui/PageHeader';
import { ReportCategoryCards } from '@/modules/reports/components/home/ReportCategoryCards';
import { RecentReportsPanel } from '@/modules/reports/components/home/RecentReportsPanel';
import { ReportStatisticsPanel } from '@/modules/reports/components/home/ReportStatisticsPanel';
import { QuickActionsPanel } from '@/modules/reports/components/home/QuickActionsPanel';

export function ReportsHomePage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Centralized reporting and export layer — view security statistics and generate structured reports across the platform."
      />

      <div className="space-y-4">
        <ReportCategoryCards />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <RecentReportsPanel />
          <ReportStatisticsPanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
