import { useState } from 'react';
import { Eye, RotateCcw, Trash2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { DataTable, type DataTableColumn } from '@/modules/settings/components/shared/DataTable';
import { backupRecords } from '@/modules/settings/mock';
import { titleCase } from '@/modules/settings/components/shared/statusTone';
import type { BackupRecord } from '@/modules/settings/types';
import type { StatusTone } from '@/types/common';

const STATUS_TONE: Record<BackupRecord['status'], StatusTone> = {
  completed: 'success',
  'in-progress': 'info',
  failed: 'danger',
};

export function RestorePage() {
  const [backups, setBackups] = useState(backupRecords.filter((b) => b.status === 'completed'));
  const [restoreTarget, setRestoreTarget] = useState<BackupRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BackupRecord | null>(null);

  const columns: DataTableColumn<BackupRecord>[] = [
    { id: 'label', header: 'Backup', cell: (r) => <span className="font-medium text-text-primary">{r.label}</span>, sortAccessor: (r) => r.label },
    { id: 'createdAt', header: 'Backup Date', cell: (r) => r.createdAt, sortAccessor: (r) => r.createdAt },
    { id: 'size', header: 'Size', cell: (r) => r.size },
    { id: 'type', header: 'Type', cell: (r) => <StatusBadge tone="neutral" dot={false}>{titleCase(r.type)}</StatusBadge>, sortAccessor: (r) => r.type },
    { id: 'status', header: 'Status', cell: (r) => <StatusBadge tone={STATUS_TONE[r.status]}>{titleCase(r.status)}</StatusBadge> },
    {
      id: 'actions',
      header: 'Actions',
      align: 'right',
      hideable: false,
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" title="Preview"><Eye className="size-3.5" /></Button>
          <Button variant="ghost" size="sm" title="Restore" onClick={() => setRestoreTarget(r)}>
            <RotateCcw className="size-3.5 text-warning-400" />
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
        title="Restore"
        description="Restore the system from a previous backup. This is a frontend representation only — no restore operation is actually performed."
      />

      <DataTable
        data={backups}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.label} ${r.type}`}
        searchPlaceholder="Search available backups…"
        pageSize={8}
        emptyTitle="No backups available"
        emptyDescription="No completed backups are available to restore."
      />

      <ConfirmationDialog
        open={!!restoreTarget}
        title="Restore Backup"
        description={`Restoring "${restoreTarget?.label}" will replace current system data with the state captured on ${restoreTarget?.createdAt}. This is a high-impact action and cannot be undone.`}
        confirmLabel="Restore System"
        tone="danger"
        onConfirm={() => setRestoreTarget(null)}
        onCancel={() => setRestoreTarget(null)}
      />

      <ConfirmationDialog
        open={!!deleteTarget}
        title="Delete Backup"
        description={`This will permanently delete "${deleteTarget?.label}" and it will no longer be available for restore.`}
        confirmLabel="Delete Backup"
        tone="danger"
        onConfirm={() => { setBackups((prev) => prev.filter((b) => b.id !== deleteTarget?.id)); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
