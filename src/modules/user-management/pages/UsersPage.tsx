import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users as UsersIcon, UserCheck, UserX, UserCog } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/data/StatCard';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { ROUTES } from '@/constants/routes';
import { managedUsers } from '@/modules/user-management/mock';
import { USER_MANAGEMENT_PATHS } from '@/modules/user-management/constants/paths';
import { UserTable } from '@/modules/user-management/components/users/UserTable';
import { UserFormDialog } from '@/modules/user-management/components/users/UserFormDialog';
import type { ManagedUser } from '@/modules/user-management/types';

export function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(managedUsers);
  const [formState, setFormState] = useState<{ open: boolean; mode: 'create' | 'edit'; user?: ManagedUser }>({
    open: false,
    mode: 'create',
  });
  const [toggleTarget, setToggleTarget] = useState<ManagedUser | null>(null);
  const [resetTarget, setResetTarget] = useState<ManagedUser | null>(null);

  const active = users.filter((u) => u.status === 'active').length;
  const disabled = users.filter((u) => u.status === 'disabled' || u.status === 'locked').length;
  const pending = users.filter((u) => u.status === 'pending').length;

  function handleToggleConfirm() {
    if (!toggleTarget) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === toggleTarget.id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u)),
    );
    setToggleTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage administrative and operational accounts across the platform."
        actions={
          <Button size="sm" onClick={() => setFormState({ open: true, mode: 'create' })}>
            <PlusCircle className="size-3.5" />
            Add User
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Users" value={users.length} icon={UsersIcon} tone="neutral" />
        <StatCard label="Active" value={active} icon={UserCheck} tone="success" />
        <StatCard label="Disabled / Locked" value={disabled} icon={UserX} tone="danger" />
        <StatCard label="Pending Activation" value={pending} icon={UserCog} tone="warning" />
      </div>

      <UserTable
        users={users}
        onView={(u) => navigate(`${ROUTES.users}/${USER_MANAGEMENT_PATHS.profile}?user=${u.id}`)}
        onEdit={(u) => setFormState({ open: true, mode: 'edit', user: u })}
        onToggleStatus={(u) => setToggleTarget(u)}
        onResetPassword={(u) => setResetTarget(u)}
        onManagePermissions={() => navigate(`${ROUTES.users}/${USER_MANAGEMENT_PATHS.permissions}`)}
      />

      <UserFormDialog
        open={formState.open}
        mode={formState.mode}
        user={formState.user}
        onClose={() => setFormState({ open: false, mode: 'create' })}
        onSave={() => setFormState({ open: false, mode: 'create' })}
      />

      <ConfirmationDialog
        open={!!toggleTarget}
        title={toggleTarget?.status === 'active' ? 'Disable User' : 'Enable User'}
        description={
          toggleTarget?.status === 'active'
            ? `"${toggleTarget?.fullName}" will immediately lose access to the platform. This action is logged.`
            : `"${toggleTarget?.fullName}" will regain access to the platform.`
        }
        confirmLabel={toggleTarget?.status === 'active' ? 'Disable User' : 'Enable User'}
        tone={toggleTarget?.status === 'active' ? 'danger' : 'primary'}
        onConfirm={handleToggleConfirm}
        onCancel={() => setToggleTarget(null)}
      />

      <ConfirmationDialog
        open={!!resetTarget}
        title="Reset Password"
        description={`A password reset link will be sent to "${resetTarget?.email}". No email is actually sent — this is a frontend representation only.`}
        confirmLabel="Send Reset Link"
        onConfirm={() => setResetTarget(null)}
        onCancel={() => setResetTarget(null)}
      />
    </div>
  );
}
