import { PageHeader } from '@/components/ui/PageHeader';
import { PermissionMatrix } from '@/modules/user-management/components/permissions/PermissionMatrix';

export function PermissionsPage() {
  return (
    <div>
      <PageHeader
        title="Permissions"
        description="Granular, per-module permission definitions for each role. These are configuration definitions for future RBAC enforcement — no permission is enforced by this UI."
      />
      <PermissionMatrix />
    </div>
  );
}
