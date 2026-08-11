import { useState } from 'react';
import { Check, Save } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { PLATFORM_MODULES } from '@/modules/user-management/constants/platformModules';
import { DEFAULT_ROLE_PERMISSION_MATRICES } from '@/modules/user-management/mock/permissionMatrix';
import type { PermissionMatrixState } from '@/modules/user-management/types';
import type { UserRole } from '@/types/auth';

const ROLES: UserRole[] = ['Administrator', 'Supervisor', 'Operator', 'Security Officer'];

export function PermissionMatrix() {
  const [role, setRole] = useState<UserRole>('Supervisor');
  const [matrices, setMatrices] = useState<Record<UserRole, PermissionMatrixState>>(DEFAULT_ROLE_PERMISSION_MATRICES);
  const [dirty, setDirty] = useState(false);

  const matrix = matrices[role];
  const isAdministrator = role === 'Administrator';

  function toggle(moduleId: string, permKey: string) {
    if (isAdministrator) return; // Administrator always has full access by definition
    setMatrices((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [moduleId]: {
          ...prev[role][moduleId],
          [permKey]: !prev[role][moduleId]?.[permKey],
        },
      },
    }));
    setDirty(true);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-(--radius-md) border border-border-default bg-surface p-2.5">
        <div className="flex flex-wrap items-center gap-1">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn(
                'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors',
                role === r ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <Button size="sm" disabled={!dirty} onClick={() => setDirty(false)}>
          <Save className="size-3.5" />
          Save Permission Set
        </Button>
      </div>

      {isAdministrator && (
        <div className="rounded-(--radius-md) border border-info-500/30 bg-info-bg px-3.5 py-2.5 text-[12px] text-info-400">
          Administrator is a system role with full, non-editable access to every module and permission.
        </div>
      )}

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Permission Matrix — {role}</AppCardTitle>
          <StatusBadge tone="neutral" dot={false}>
            {PLATFORM_MODULES.length} modules
          </StatusBadge>
        </AppCardHeader>
        <AppCardContent className="space-y-5">
          {PLATFORM_MODULES.map((mod) => (
            <div key={mod.id} className={cn('border-b border-border-default pb-4 last:border-0 last:pb-0', !mod.implemented && 'opacity-70')}>
              <div className="mb-2 flex items-center gap-2">
                <p className="text-[13px] font-medium text-text-primary">{mod.label}</p>
                {!mod.implemented && (
                  <StatusBadge tone="neutral" dot={false} className="px-1.5 py-0">
                    Planned
                  </StatusBadge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {mod.permissions.map((perm) => {
                  const granted = isAdministrator ? true : !!matrix[mod.id]?.[perm.key];
                  return (
                    <label
                      key={perm.key}
                      className={cn(
                        'flex items-center gap-2 rounded-(--radius-md) border px-2.5 py-2 text-[12px] transition-colors',
                        granted
                          ? 'border-success-500/30 bg-success-bg text-success-400'
                          : 'border-border-default bg-surface-raised text-text-secondary',
                        !isAdministrator && 'cursor-pointer hover:border-primary-500/50',
                      )}
                    >
                      <Checkbox checked={granted} disabled={isAdministrator} onChange={() => toggle(mod.id, perm.key)} />
                      {perm.label}
                      {granted && <Check className="ml-auto size-3 shrink-0" />}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </AppCardContent>
      </AppCard>
    </div>
  );
}
