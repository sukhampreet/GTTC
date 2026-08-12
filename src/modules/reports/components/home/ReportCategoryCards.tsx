import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert, Users, ParkingSquare, FlameKindling, DoorOpen, BrainCircuit, ListTree, HardDrive,
} from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { REPORTS_PATHS } from '@/modules/reports/constants/paths';
import {
  incidentReports, attendanceSummary, parkingReportSummary, fireReportSummary,
  accessReportSummary, aiReportSummary, eventReportSummary, deviceReportSummary,
} from '@/modules/reports/mock';

export function ReportCategoryCards() {
  const navigate = useNavigate();

  const categories = [
    { label: 'Incident Reports', value: incidentReports.length, icon: ShieldAlert, path: REPORTS_PATHS.incident },
    { label: 'Attendance Reports', value: `${attendanceSummary.attendanceRate}%`, icon: Users, path: REPORTS_PATHS.attendance },
    { label: 'Parking Reports', value: parkingReportSummary.vehicles, icon: ParkingSquare, path: REPORTS_PATHS.parking },
    { label: 'Fire Reports', value: fireReportSummary.fireAlarms, icon: FlameKindling, path: REPORTS_PATHS.fire },
    { label: 'Access Reports', value: accessReportSummary.accessAttempts, icon: DoorOpen, path: REPORTS_PATHS.access },
    { label: 'AI Reports', value: aiReportSummary.aiDetections, icon: BrainCircuit, path: REPORTS_PATHS.ai },
    { label: 'Event Reports', value: eventReportSummary.totalEvents, icon: ListTree, path: REPORTS_PATHS.event },
    { label: 'Device Reports', value: deviceReportSummary.totalDevices, icon: HardDrive, path: REPORTS_PATHS.device },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <AppCard
            key={cat.label}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`${ROUTES.reports}/${cat.path}`)}
            className="flex cursor-pointer flex-col gap-2.5 p-3.5 transition-colors hover:border-border-strong hover:bg-surface-hover"
          >
            <div className="flex size-8 items-center justify-center rounded-(--radius-md) bg-primary-900 text-primary-300">
              <Icon className="size-4" />
            </div>
            <div>
              <p className="text-lg font-semibold tabular-nums text-text-primary">{cat.value}</p>
              <p className="text-[11.5px] text-text-tertiary">{cat.label}</p>
            </div>
          </AppCard>
        );
      })}
    </div>
  );
}
