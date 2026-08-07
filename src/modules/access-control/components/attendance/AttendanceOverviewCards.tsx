import { UserCheck, UserX, Clock4, CalendarCheck2 } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { attendanceRecords } from '@/modules/access-control/mock';

export function AttendanceOverviewCards() {
  const present = attendanceRecords.filter((a) => a.status === 'present').length;
  const absent = attendanceRecords.filter((a) => a.status === 'absent').length;
  const late = attendanceRecords.filter((a) => a.status === 'late').length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Today's Attendance" value={attendanceRecords.length} icon={CalendarCheck2} tone="neutral" />
      <StatCard label="Present" value={present} icon={UserCheck} tone="success" />
      <StatCard label="Absent" value={absent} icon={UserX} tone="danger" />
      <StatCard label="Late" value={late} icon={Clock4} tone="warning" />
    </div>
  );
}
