import { DoorOpen, CheckCircle2, XCircle, ShieldAlert, Unlock, Users } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { accessReportSummary } from '@/modules/reports/mock';
import { AccessReportSummaryPanel } from '@/modules/reports/components/access/AccessReportSummaryPanel';

export function AccessReportsPage() {
  return (
    <div>
      <PageHeader title="Access Reports" description="Access control activity summary, sourced from the Access Control module." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Access Attempts" value={accessReportSummary.accessAttempts} icon={DoorOpen} tone="neutral" />
        <StatCard label="Granted" value={accessReportSummary.granted} icon={CheckCircle2} tone="success" />
        <StatCard label="Denied" value={accessReportSummary.denied} icon={XCircle} tone="warning" />
        <StatCard label="Unauthorized Attempts" value={accessReportSummary.unauthorizedAttempts} icon={ShieldAlert} tone="danger" />
        <StatCard label="Emergency Unlocks" value={accessReportSummary.emergencyUnlocks} icon={Unlock} tone="warning" />
        <StatCard label="Attendance Events" value={accessReportSummary.attendanceEvents} icon={Users} tone="neutral" />
      </div>

      <AccessReportSummaryPanel />
    </div>
  );
}
