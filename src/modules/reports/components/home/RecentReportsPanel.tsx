import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ROUTES } from '@/constants/routes';
import { REPORTS_PATHS } from '@/modules/reports/constants/paths';
import { reportHistory } from '@/modules/reports/mock';
import { REPORT_STATUS_TONE, titleCase } from '@/modules/reports/components/shared/statusTone';

export function RecentReportsPanel() {
  const navigate = useNavigate();
  const preview = reportHistory.slice(0, 6);

  return (
    <AppCard className="flex h-full flex-col">
      <AppCardHeader>
        <AppCardTitle>Recent Reports</AppCardTitle>
        <Button variant="ghost" size="sm" onClick={() => navigate(`${ROUTES.reports}/${REPORTS_PATHS.details}`)}>
          View all
          <ArrowRight className="size-3.5" />
        </Button>
      </AppCardHeader>
      <AppCardContent className="flex-1 p-0">
        <ul className="divide-y divide-border-default">
          {preview.map((report) => (
            <li key={report.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <FileText className="size-3.5 shrink-0 text-text-tertiary" />
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{report.title}</p>
                  <p className="truncate text-[10.5px] text-text-tertiary">{report.generatedBy} · {report.generatedDate}</p>
                </div>
              </div>
              <StatusBadge tone={REPORT_STATUS_TONE[report.status]} className="shrink-0 px-1.5 py-0">
                {titleCase(report.status)}
              </StatusBadge>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
