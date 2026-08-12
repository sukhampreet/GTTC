import { Users, UserCheck, UserX, Clock } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { attendanceSummary } from '@/modules/reports/mock';
import { AttendanceTrendChart } from '@/modules/reports/components/attendance/AttendanceTrendChart';

export function AttendanceReportsPage() {
  return (
    <div>
      <PageHeader title="Attendance Reports" description="Daily, weekly and monthly attendance tracking across the workforce." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatCard label="Total Employees" value={attendanceSummary.totalEmployees} icon={Users} tone="neutral" />
        <StatCard label="Present" value={attendanceSummary.present} icon={UserCheck} tone="success" />
        <StatCard label="Absent" value={attendanceSummary.absent} icon={UserX} tone="warning" />
        <StatCard label="Late" value={attendanceSummary.late} icon={Clock} tone="warning" />
        <StatCard label="Attendance Rate" value={`${attendanceSummary.attendanceRate}%`} icon={UserCheck} tone="success" />
      </div>

      <AttendanceTrendChart />
    </div>
  );
}
