import { useState } from 'react';
import { Download, PlusCircle, Trash2, CalendarClock } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/data/StatCard';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { DataTable, type DataTableColumn } from '@/modules/settings/components/shared/DataTable';
import { backupRecords, nextScheduledBackup } from '@/modules/settings/mock';
import { titleCase } from '@/modules/settings/components/shared/statusTone';
import type { BackupRecord } from '@/modules/settings/types';
import type { StatusTone } from '@/types/common';

const STATUS_TONE: Record<BackupRecord['status'], StatusTone> = {
  completed: 'success',
  'in-progress': 'info',
  failed: 'danger',
};

export function BackupPage() {
  const [backups, setBackups] = useState(backupRecords);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BackupRecord | null>(null);

  const lastBackup = backups.find((b) => b.status === 'completed');
  const totalSizeLabel = `${backups.length} backups stored`;

  function handleCreateBackup() {
    setCreating(false);
    setBackups((prev) => [
      { id: `BKP-${prev.length + 1}`, label: `Full System Backup — Manual`, type: 'full', createdAt: 'Just now', size: '—', status: 'in-progress', location: 'Local NAS · /backups/full' },
      ...prev,
    ]);
  }

  const columns: DataTableColumn<BackupRecord>[] = [
    { id: 'label', header: 'Backup', cell: (r) => <span className="font-medium text-text-primary">{r.label}</span>, sortAccessor: (r) => r.label },
    { id: 'type', header: 'Type', cell: (r) => <StatusBadge tone="neutral" dot={false}>{titleCase(r.type)}</StatusBadge>, sortAccessor: (r) => r.type },
    { id: 'createdAt', header: 'Created', cell: (r) => r.createdAt, sortAccessor: (r) => r.createdAt },
    { id: 'size', header: 'Size', cell: (r) => r.size },
    { id: 'location', header: 'Storage Location', cell: (r) => <span className="text-[11.5px] text-text-tertiary">{r.location}</span>, hideable: true },
    { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge>, sortAccessor: (r) => r.status },
    {
      id: 'actions',
      header: 'Actions',
      align: 'right',
      hideable: false,
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" title="Download" disabled={r.status !== 'completed'}>
            <Download className="size-3.5" />
          </Button>
          <Button variant="ghost" size="sm" title="Delete" onClick={() => setDeleteTarget(r)}>
            <Trash2 className="size-3.5 text-danger-400" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Backup"
        description="Manage system backups. Actions below are frontend representations only — no backup is actually created, downloaded or deleted."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CalendarClock className="size-3.5" />
              Schedule Backup
            </Button>
            <Button size="sm" onClick={() => setCreating(true)}>
              <PlusCircle className="size-3.5" />
              Create Backup
            </Button>
          </div>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Last Backup" value={lastBackup?.createdAt ?? '—'} icon={CalendarClock} tone="success" hint={lastBackup?.label} />
        <StatCard label="Backup Size" value={lastBackup?.size ?? '—'} icon={CalendarClock} tone="neutral" />
        <StatCard label="Next Scheduled" value="Tonight 03:00" icon={CalendarClock} tone="info" hint={nextScheduledBackup} />
        <StatCard label="Total Backups" value={backups.length} icon={CalendarClock} tone="neutral" hint={totalSizeLabel} />
      </div>

      <DataTable
        data={backups}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.label} ${r.type} ${r.location}`}
        searchPlaceholder="Search backups…"
        pageSize={8}
        emptyTitle="No backups found"
        emptyDescription="No backups match the current search."
      />

      <ConfirmationDialog
        open={creating}
        title="Create Backup"
        description="This will start a full system backup. This is a frontend simulation — no data is actually backed up."
        confirmLabel="Start Backup"
        onConfirm={handleCreateBackup}
        onCancel={() => setCreating(false)}
      />

      <ConfirmationDialog
        open={!!deleteTarget}
        title="Delete Backup"
        description={`This will permanently delete "${deleteTarget?.label}". This action cannot be undone.`}
        confirmLabel="Delete Backup"
        tone="danger"
        onConfirm={() => { setBackups((prev) => prev.filter((b) => b.id !== deleteTarget?.id)); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
