import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { Activity, ShieldAlert, HardDrive } from 'lucide-react';
import { weeklyReports } from '@/modules/reports/mock';
import { WeeklyReportChart } from '@/modules/reports/components/weekly/WeeklyReportChart';

export function WeeklyReportsPage() {
  const totalEvents = weeklyReports.reduce((sum, d) => sum + d.events, 0);
  const totalIncidents = weeklyReports.reduce((sum, d) => sum + d.incidents, 0);

  return (
    <div>
      <PageHeader title="Weekly Reports" description="Seven-day rollup of security incidents, access, parking, fire and AI activity." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Weekly Events" value={totalEvents} icon={Activity} tone="neutral" />
        <StatCard label="Security Incidents" value={totalIncidents} icon={ShieldAlert} tone={totalIncidents > 0 ? 'warning' : 'success'} />
        <StatCard label="Device Health" value="97.4% Uptime" icon={HardDrive} tone="success" />
      </div>

      <WeeklyReportChart />
    </div>
  );
}
