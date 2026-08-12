import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { ReportsLayout } from '@/modules/reports/layout/ReportsLayout';
import { REPORTS_PATHS } from '@/modules/reports/constants/paths';

import { ReportsHomePage } from '@/modules/reports/pages/ReportsHomePage';
import { DailyReportsPage } from '@/modules/reports/pages/DailyReportsPage';
import { WeeklyReportsPage } from '@/modules/reports/pages/WeeklyReportsPage';
import { MonthlyReportsPage } from '@/modules/reports/pages/MonthlyReportsPage';
import { IncidentReportsPage } from '@/modules/reports/pages/IncidentReportsPage';
import { AttendanceReportsPage } from '@/modules/reports/pages/AttendanceReportsPage';
import { ParkingReportsPage } from '@/modules/reports/pages/ParkingReportsPage';
import { FireReportsPage } from '@/modules/reports/pages/FireReportsPage';
import { AccessReportsPage } from '@/modules/reports/pages/AccessReportsPage';
import { ReportsAIReportsPage } from '@/modules/reports/pages/ReportsAIReportsPage';
import { EventReportsPage } from '@/modules/reports/pages/EventReportsPage';
import { DeviceReportsPage } from '@/modules/reports/pages/DeviceReportsPage';
import { ReportDetailsPage } from '@/modules/reports/pages/ReportDetailsPage';
import { ReportExportPage } from '@/modules/reports/pages/ReportExportPage';

/**
 * Sprint 10 — Reports module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>, mirroring the
 * fire-emergency / live-monitoring / ai-analytics module pattern.
 */
export const reportsRoutes = (
  <Route key="reports" path={ROUTES.reports} element={<ReportsLayout />}>
    <Route index element={<ReportsHomePage />} />
    <Route path={REPORTS_PATHS.daily} element={<DailyReportsPage />} />
    <Route path={REPORTS_PATHS.weekly} element={<WeeklyReportsPage />} />
    <Route path={REPORTS_PATHS.monthly} element={<MonthlyReportsPage />} />
    <Route path={REPORTS_PATHS.incident} element={<IncidentReportsPage />} />
    <Route path={REPORTS_PATHS.attendance} element={<AttendanceReportsPage />} />
    <Route path={REPORTS_PATHS.parking} element={<ParkingReportsPage />} />
    <Route path={REPORTS_PATHS.fire} element={<FireReportsPage />} />
    <Route path={REPORTS_PATHS.access} element={<AccessReportsPage />} />
    <Route path={REPORTS_PATHS.ai} element={<ReportsAIReportsPage />} />
    <Route path={REPORTS_PATHS.event} element={<EventReportsPage />} />
    <Route path={REPORTS_PATHS.device} element={<DeviceReportsPage />} />
    <Route path={REPORTS_PATHS.details} element={<ReportDetailsPage />} />
    <Route path={REPORTS_PATHS.export} element={<ReportExportPage />} />
  </Route>
);
