import { useState } from 'react';
import { Eye, FolderLock, Pencil, PlusCircle, Trash2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/data/StatCard';
import { Dialog, ConfirmationDialog } from '@/components/ui/Dialog';
import { TextField } from '@/modules/user-management/components/shared/FormField';
import { DataTable, type DataTableColumn } from '@/modules/user-management/components/shared/DataTable';
import { accessGroupRecords } from '@/modules/user-management/mock';
import { PLATFORM_MODULES } from '@/modules/user-management/constants/platformModules';
import type { AccessGroupRecord } from '@/modules/user-management/types';

export function AccessGroupsPage() {
  const [groups, setGroups] = useState(accessGroupRecords);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AccessGroupRecord | null>(null);

  function moduleLabels(ids: string[]) {
    return ids.map((id) => PLATFORM_MODULES.find((m) => m.id === id)?.label ?? id).join(', ');
  }

  const columns: DataTableColumn<AccessGroupRecord>[] = [
    {
      id: 'name',
      header: 'Group Name',
      cell: (r) => (
        <div className="flex items-center gap-2">
          <FolderLock className="size-3.5 text-text-tertiary" />
          <span className="font-medium text-text-primary">{r.name}</span>
        </div>
      ),
      sortAccessor: (r) => r.name,
    },
    { id: 'description', header: 'Description', cell: (r) => <span className="text-[12px]">{r.description}</span> },
    { id: 'assignedUsers', header: 'Assigned Users', cell: (r) => r.assignedUsers, sortAccessor: (r) => r.assignedUsers, align: 'center' },
    {
      id: 'assignedModules',
      header: 'Assigned Modules',
      cell: (r) => <span className="text-[11.5px] text-text-tertiary">{moduleLabels(r.assignedModules)}</span>,
      hideable: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (r) => <StatusBadge tone={r.status === 'active' ? 'success' : 'neutral'}>{r.status === 'active' ? 'Active' : 'Inactive'}</StatusBadge>,
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
          <Button variant="ghost" size="sm" title="Edit"><Pencil className="size-3.5" /></Button>
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
        title="Access Groups"
        description="Bundle module access and permissions into reusable groups assigned to users."
        actions={
          <Button size="sm" onClick={() => setFormOpen(true)}>
            <PlusCircle className="size-3.5" />
            Create Group
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Groups" value={groups.length} icon={FolderLock} tone="neutral" />
        <StatCard label="Active Groups" value={groups.filter((g) => g.status === 'active').length} icon={FolderLock} tone="success" />
        <StatCard label="Total Assigned Users" value={groups.reduce((s, g) => s + g.assignedUsers, 0)} icon={FolderLock} tone="info" />
        <StatCard label="Inactive Groups" value={groups.filter((g) => g.status === 'inactive').length} icon={FolderLock} tone="neutral" />
      </div>

      <DataTable
        data={groups}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.name} ${r.description}`}
        searchPlaceholder="Search access groups…"
        pageSize={8}
        emptyTitle="No access groups found"
        emptyDescription="No access groups match the current search."
      />

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} title="Create Access Group" description="Frontend definition only." className="max-w-lg">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setFormOpen(false);
          }}
        >
          <TextField label="Group Name" required placeholder="e.g. Night Shift Security" />
          <TextField label="Description" required placeholder="Describe who this group is for" />
          <div className="flex justify-end gap-2 border-t border-border-default pt-4">
            <Button type="button" variant="outline" size="sm" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button type="submit" size="sm">Create Group</Button>
          </div>
        </form>
      </Dialog>

      <ConfirmationDialog
        open={!!deleteTarget}
        title="Delete Access Group"
        description={`This will permanently delete the "${deleteTarget?.name}" access group. Users assigned to it will lose the module access it granted.`}
        confirmLabel="Delete Group"
        tone="danger"
        onConfirm={() => { setGroups((prev) => prev.filter((g) => g.id !== deleteTarget?.id)); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
