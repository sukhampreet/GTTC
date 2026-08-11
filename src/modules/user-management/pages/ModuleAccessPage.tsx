import { PageHeader } from '@/components/ui/PageHeader';
import { ModuleAccessMatrix } from '@/modules/user-management/components/moduleAccess/ModuleAccessMatrix';

export function ModuleAccessPage() {
  return (
    <div>
      <PageHeader
        title="Module Access"
        description="High-level access levels per platform module, scoped to an access group. Configures access — does not modify the other modules."
      />
      <ModuleAccessMatrix />
    </div>
  );
}
