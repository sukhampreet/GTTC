import { useState } from 'react';
import { Eye, Monitor, Radio, XCircle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/data/StatCard';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { DataTable, type DataTableColumn } from '@/modules/user-management/components/shared/DataTable';
import { sessionRecords } from '@/modules/user-management/mock';
import type { SessionRecord } from '@/modules/user-management/types';
import type { StatusTone } from '@/types/common';

const SESSION_TONE: Record<SessionRecord['status'], StatusTone> = {
  active: 'success',
  idle: 'warning',
  expired: 'neutral',
};

export function SessionsPage() {
  const [sessions, setSessions] = useState(sessionRecords);
  const [terminateTarget, setTerminateTarget] = useState<SessionRecord | null>(null);

  const columns: DataTableColumn<SessionRecord>[] = [
    { id: 'username', header: 'Username', cell: (r) => <span className="font-medium text-text-primary">{r.fullName}</span>, sortAccessor: (r) => r.fullName },
    { id: 'role', header: 'Role', cell: (r) => <StatusBadge tone="info" dot={false}>{r.role}</StatusBadge>, sortAccessor: (r) => r.role },
    { id: 'device', header: 'Device', cell: (r) => <span className="flex items-center gap-1.5 text-[12px]"><Monitor className="size-3.5 text-text-tertiary" />{r.device}</span> },
    { id: 'ipAddress', header: 'IP Address', cell: (r) => <span className="font-mono text-[12px]">{r.ipAddress}</span>, sortAccessor: (r) => r.ipAddress },
    { id: 'loginTime', header: 'Login Time', cell: (r) => r.loginTime, sortAccessor: (r) => r.loginTime },
    { id: 'lastActivity', header: 'Last Activity', cell: (r) => r.lastActivity },
    {
      id: 'status',
      header: 'Session Status',
      cell: (r) => <StatusBadge tone={SESSION_TONE[r.status]}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</StatusBadge>,
      sortAccessor: (r) => r.status,
    },
    {
      id: 'actions',
      header: 'Actions',
      align: 'right',
      hideable: false,
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" title="View"><Eye className="size-3.5" /></Button>
          <Button
            variant="ghost"
            size="sm"
            title="Terminate Session"
            disabled={r.status === 'expired'}
            onClick={() => setTerminateTarget(r)}
          >
            <XCircle className="size-3.5 text-danger-400" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Session Management" description="Monitor and manage active administrative and operational sessions." />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Sessions" value={sessions.length} icon={Radio} tone="neutral" />
        <StatCard label="Active" value={sessions.filter((s) => s.status === 'active').length} icon={Radio} tone="success" />
        <StatCard label="Idle" value={sessions.filter((s) => s.status === 'idle').length} icon={Radio} tone="warning" />
        <StatCard label="Expired" value={sessions.filter((s) => s.status === 'expired').length} icon={Radio} tone="neutral" />
      </div>

      <DataTable
        data={sessions}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.fullName} ${r.username} ${r.ipAddress}`}
        searchPlaceholder="Search by user or IP address…"
        pageSize={8}
        emptyTitle="No active sessions"
        emptyDescription="No sessions match the current search."
      />

      <ConfirmationDialog
        open={!!terminateTarget}
        title="Terminate Session"
        description={`This will immediately sign out "${terminateTarget?.fullName}" from ${terminateTarget?.device}. This action is logged and audited.`}
        confirmLabel="Terminate Session"
        tone="danger"
        onConfirm={() => {
          setSessions((prev) => prev.map((s) => (s.id === terminateTarget?.id ? { ...s, status: 'expired' } : s)));
          setTerminateTarget(null);
        }}
        onCancel={() => setTerminateTarget(null)}
      />
    </div>
  );
}
