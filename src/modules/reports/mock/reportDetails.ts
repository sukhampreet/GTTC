import type { ReportDetail } from '@/modules/reports/types';

export const sampleReportDetail: ReportDetail = {
  id: 'RPT-1002',
  title: 'Weekly Incident Report — Week 32',
  reportType: 'Weekly',
  dateRangeFrom: '2026-08-03',
  dateRangeTo: '2026-08-09',
  generatedBy: 'Admin',
  generatedDate: '2026-08-10 18:20',
  summary:
    'Weekly rollup of security incidents across all subsystems. Incident volume rose 8% week-over-week, driven primarily by AI Analytics-flagged perimeter events. All critical incidents were acknowledged within SLA.',
  notes: 'No unresolved critical incidents carried into the following week.',
  statistics: [
    { label: 'Total Incidents', value: 46 },
    { label: 'Critical', value: 6, tone: 'danger' },
    { label: 'High', value: 11, tone: 'warning' },
    { label: 'Resolved', value: 39, tone: 'success' },
    { label: 'Avg. Resolution Time', value: '2.4 hrs' },
    { label: 'SLA Compliance', value: '96%', tone: 'success' },
  ],
};
