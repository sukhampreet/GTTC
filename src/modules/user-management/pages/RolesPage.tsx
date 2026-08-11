import { useState } from 'react';
import { Copy, Eye, Pencil, PlusCircle, ShieldCheck, Trash2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatCard } from '@/components/data/StatCard';
import { Dialog, ConfirmationDialog } from '@/components/ui/Dialog';
import { TextField } from '@/modules/user-management/components/shared/FormField';
import { DataTable, type DataTableColumn } from '@/modules/user-management/components/shared/DataTable';
import { roleRecords } from '@/modules/user-management/mock';
import type { RoleRecord } from '@/modules/user-management/types';

export function RolesPage() {
  const [roles, setRoles] = useState(roleRecords);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RoleRecord | null>(null);

  function handleDuplicate(role: RoleRecord) {
    setRoles((prev) => [
      ...prev,
      { ...role, id: `${role.id}-COPY-${prev.length}`, name: role.name, description: `${role.description} (Copy)`, usersAssigned: 0, isSystemRole: false },
    ]);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setRoles((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  const columns: DataTableColumn<RoleRecord>[] = [
    {
      id: 'name',
      header: 'Role Name',
      cell: (r) => (
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-text-tertiary" />
          <span className="font-medium text-text-primary">{r.name}</span>
          {r.isSystemRole && <StatusBadge tone="neutral" dot={false} className="px-1.5 py-0">System</StatusBadge>}
        </div>
      ),
      sortAccessor: (r) => r.name,
    },
    { id: 'description', header: 'Description', cell: (r) => <span className="text-[12px]">{r.description}</span> },
    { id: 'usersAssigned', header: 'Users Assigned', cell: (r) => r.usersAssigned, sortAccessor: (r) => r.usersAssigned, align: 'center' },
    { id: 'permissionCount', header: 'Permission Count', cell: (r) => r.permissionCount, sortAccessor: (r) => r.permissionCount, align: 'center' },
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
          <Button variant="ghost" size="sm" title="Edit" onClick={() => { setEditingRole(r); setFormOpen(true); }}>
            <Pencil className="size-3.5" />
          </Button>
          <Button variant="ghost" size="sm" title="Duplicate" onClick={() => handleDuplicate(r)}>
            <Copy className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title="Delete"
            disabled={r.isSystemRole}
            onClick={() => setDeleteTarget(r)}
          >
            <Trash2 className="size-3.5 text-danger-400" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Roles"
        description="Define role templates that determine baseline module access across the platform."
        actions={
          <Button size="sm" onClick={() => { setEditingRole(null); setFormOpen(true); }}>
            <PlusCircle className="size-3.5" />
            Create Role
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Roles" value={roles.length} icon={ShieldCheck} tone="neutral" />
        <StatCard label="Active Roles" value={roles.filter((r) => r.status === 'active').length} icon={ShieldCheck} tone="success" />
        <StatCard label="System Roles" value={roles.filter((r) => r.isSystemRole).length} icon={ShieldCheck} tone="info" />
        <StatCard label="Total Users Covered" value={roles.reduce((sum, r) => sum + r.usersAssigned, 0)} icon={ShieldCheck} tone="neutral" />
      </div>

      <DataTable
        data={roles}
        columns={columns}
        getRowId={(r) => r.id}
        searchableText={(r) => `${r.name} ${r.description}`}
        searchPlaceholder="Search roles…"
        pageSize={8}
        emptyTitle="No roles found"
        emptyDescription="No roles match the current search."
      />

      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingRole ? `Edit Role — ${editingRole.name}` : 'Create Role'}
        description="Frontend definition only — this does not alter permission enforcement."
        className="max-w-lg"
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setFormOpen(false);
          }}
        >
          <TextField label="Role Name" defaultValue={editingRole?.name} required placeholder="e.g. Regional Supervisor" />
          <TextField label="Description" defaultValue={editingRole?.description} required placeholder="Describe the scope of this role" />
          <div className="flex justify-end gap-2 border-t border-border-default pt-4">
            <Button type="button" variant="outline" size="sm" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editingRole ? 'Save Changes' : 'Create Role'}
            </Button>
          </div>
        </form>
      </Dialog>

      <ConfirmationDialog
        open={!!deleteTarget}
        title="Delete Role"
        description={`This will permanently delete the "${deleteTarget?.name}" role definition. Users currently assigned this role are not affected.`}
        confirmLabel="Delete Role"
        tone="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
