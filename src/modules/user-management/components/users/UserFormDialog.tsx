import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { SelectField, TextField } from '@/modules/user-management/components/shared/FormField';
import type { ManagedUser } from '@/modules/user-management/types';
import type { UserRole } from '@/types/auth';

const ROLE_OPTIONS: UserRole[] = ['Administrator', 'Supervisor', 'Operator', 'Security Officer'];
const ACCESS_GROUP_OPTIONS = [
  'System Administration',
  'Security Operations',
  'Security Administration',
  'Fire Response Team',
  'Parking Operations',
  'Facility Management',
];

export interface UserFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  user?: ManagedUser;
  onClose: () => void;
  onSave: () => void;
}

export function UserFormDialog({ open, mode, user, onClose, onSave }: UserFormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={mode === 'create' ? 'Add User' : `Edit User — ${user?.fullName ?? ''}`}
      description="Frontend representation only — no account is created or modified on a backend."
      className="max-w-lg"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Full Name" defaultValue={user?.fullName} required placeholder="e.g. Aishwarya Rao" />
          <TextField label="Username" defaultValue={user?.username} required placeholder="e.g. aishwarya.r" />
          <TextField label="Email" type="email" defaultValue={user?.email} required placeholder="name@gttc-security.local" />
          <TextField label="Phone" defaultValue={user?.phone} placeholder="+91 90000 00000" />
          <TextField label="Department" defaultValue={user?.department} />
          <TextField label="Designation" defaultValue={user?.designation} />
          <SelectField label="Role" options={ROLE_OPTIONS} defaultValue={user?.role ?? ROLE_OPTIONS[2]} required />
          <SelectField label="Access Group" options={ACCESS_GROUP_OPTIONS} defaultValue={user?.accessGroup} />
        </div>

        <div className="flex justify-end gap-2 border-t border-border-default pt-4">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm">
            {mode === 'create' ? 'Add User' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
