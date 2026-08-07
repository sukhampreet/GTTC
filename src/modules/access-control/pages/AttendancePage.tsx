import { PageHeader } from '@/components/ui/PageHeader';
import { attendanceRecords, dailyAttendanceTrend, weeklyAttendanceTrend } from '@/modules/access-control/mock';
import { AttendanceOverviewCards } from '@/modules/access-control/components/attendance/AttendanceOverviewCards';
import { AttendanceCharts } from '@/modules/access-control/components/attendance/AttendanceCharts';
import { AttendanceTable } from '@/modules/access-control/components/attendance/AttendanceTable';

export function AttendancePage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Attendance" description="Track daily attendance derived from access events, with present/absent/late trends." />
      <AttendanceOverviewCards />
      <AttendanceCharts daily={dailyAttendanceTrend} weekly={weeklyAttendanceTrend} />
      <AttendanceTable records={attendanceRecords} />
    </div>
  );
}
