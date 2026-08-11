import { Eye, KeyRound, Pencil, ShieldCheck, UserRoundX, UserRoundCheck } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { DataTable, type DataTableColumn } from '@/modules/user-management/components/shared/DataTable';
import { ACCOUNT_STATUS_LABEL, ACCOUNT_STATUS_TONE, initials } from '@/modules/user-management/components/shared/statusTone';
import type { ManagedUser } from '@/modules/user-management/types';

export interface UserTableProps {
  users: ManagedUser[];
  onView: (user: ManagedUser) => void;
  onEdit: (user: ManagedUser) => void;
  onToggleStatus: (user: ManagedUser) => void;
  onResetPassword: (user: ManagedUser) => void;
  onManagePermissions: (user: ManagedUser) => void;
}

export function UserTable({ users, onView, onEdit, onToggleStatus, onResetPassword, onManagePermissions }: UserTableProps) {
  const columns: DataTableColumn<ManagedUser>[] = [
    {
      id: 'fullName',
      header: 'Name',
      cell: (r) => (
        <div className="flex items-center gap-2.5">
          <Avatar initials={initials(r.fullName)} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium text-text-primary">{r.fullName}</p>
            <p className="truncate text-[11px] text-text-tertiary">@{r.username}</p>
          </div>
        </div>
      ),
      sortAccessor: (r) => r.fullName,
    },
    { id: 'email', header: 'Email', cell: (r) => <span className="text-[12px]">{r.email}</span>, sortAccessor: (r) => r.email },
    { id: 'department', header: 'Department', cell: (r) => r.department, sortAccessor: (r) => r.department },
    { id: 'role', header: 'Role', cell: (r) => <StatusBadge tone="info" dot={false}>{r.role}</StatusBadge>, sortAccessor: (r) => r.role },
    {
      id: 'status',
      header: 'Status',
      cell: (r) => <StatusBadge tone={ACCOUNT_STATUS_TONE[r.status]}>{ACCOUNT_STATUS_LABEL[r.status]}</StatusBadge>,
      sortAccessor: (r) => r.status,
    },
    { id: 'lastLogin', header: 'Last Login', cell: (r) => r.lastLogin, sortAccessor: (r) => r.lastLogin },
    { id: 'createdDate', header: 'Created Date', cell: (r) => r.createdDate, sortAccessor: (r) => r.createdDate, hideable: true },
    { id: 'accessGroup', header: 'Access Group', cell: (r) => r.accessGroup, sortAccessor: (r) => r.accessGroup, hideable: true },
    {
      id: 'actions',
      header: 'Actions',
      align: 'right',
      hideable: false,
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" title="View" onClick={() => onView(r)}>
            <Eye className="size-3.5" />
          </Button>
          <Button variant="ghost" size="sm" title="Edit" onClick={() => onEdit(r)}>
            <Pencil className="size-3.5" />
          </Button>
          <Button variant="ghost" size="sm" title="Reset Password" onClick={() => onResetPassword(r)}>
            <KeyRound className="size-3.5" />
          </Button>
          <Button variant="ghost" size="sm" title="Manage Permissions" onClick={() => onManagePermissions(r)}>
            <ShieldCheck className="size-3.5" />
          </Button>
          <Button variant="ghost" size="sm" title={r.status === 'active' ? 'Disable User' : 'Enable User'} onClick={() => onToggleStatus(r)}>
            {r.status === 'active' ? <UserRoundX className="size-3.5 text-danger-400" /> : <UserRoundCheck className="size-3.5 text-success-400" />}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => `${r.fullName} ${r.username} ${r.email} ${r.department}`}
      searchPlaceholder="Search by name, username, email or department…"
      pageSize={8}
      emptyTitle="No users found"
      emptyDescription="No users match the current search."
    />
  );
}
