import { useState } from 'react';
import { Save } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { PLATFORM_MODULES } from '@/modules/user-management/constants/platformModules';
import { accessGroupRecords } from '@/modules/user-management/mock';

const ACCESS_LEVELS = [
  { key: 'view', label: 'View' },
  { key: 'manage', label: 'Manage' },
  { key: 'configure', label: 'Configure' },
  { key: 'export', label: 'Export' },
  { key: 'administrate', label: 'Administrative Access' },
] as const;

type AccessLevelKey = (typeof ACCESS_LEVELS)[number]['key'];
type ModuleAccessState = Record<string, Record<AccessLevelKey, boolean>>;

function seedState(assignedModuleIds: string[]): ModuleAccessState {
  const state: ModuleAccessState = {};
  for (const mod of PLATFORM_MODULES) {
    const assigned = assignedModuleIds.includes(mod.id);
    state[mod.id] = {
      view: assigned,
      manage: assigned && mod.id !== 'settings',
      configure: false,
      export: assigned && ['reports', 'video-surveillance', 'access-control'].includes(mod.id),
      administrate: false,
    };
  }
  return state;
}

export function ModuleAccessMatrix() {
  const [groupId, setGroupId] = useState(accessGroupRecords[0]?.id ?? '');
  const group = accessGroupRecords.find((g) => g.id === groupId) ?? accessGroupRecords[0];
  const [state, setState] = useState<ModuleAccessState>(seedState(group?.assignedModules ?? []));
  const [dirty, setDirty] = useState(false);

  function selectGroup(id: string) {
    const g = accessGroupRecords.find((g) => g.id === id);
    setGroupId(id);
    setState(seedState(g?.assignedModules ?? []));
    setDirty(false);
  }

  function toggle(moduleId: string, level: AccessLevelKey) {
    setState((prev) => ({ ...prev, [moduleId]: { ...prev[moduleId], [level]: !prev[moduleId][level] } }));
    setDirty(true);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-(--radius-md) border border-border-default bg-surface p-2.5">
        <div className="flex flex-wrap items-center gap-1">
          {accessGroupRecords.map((g) => (
            <button
              key={g.id}
              onClick={() => selectGroup(g.id)}
              className={cn(
                'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors',
                groupId === g.id ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
              )}
            >
              {g.name}
            </button>
          ))}
        </div>
        <Button size="sm" disabled={!dirty} onClick={() => setDirty(false)}>
          <Save className="size-3.5" />
          Save Module Access
        </Button>
      </div>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Module Access — {group?.name}</AppCardTitle>
          <StatusBadge tone="neutral" dot={false}>{group?.assignedUsers} users</StatusBadge>
        </AppCardHeader>
        <AppCardContent className="overflow-x-auto p-0">
          <table className="w-full border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-border-default bg-surface-raised/60">
                <th className="whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Module</th>
                {ACCESS_LEVELS.map((level) => (
                  <th key={level.key} className="whitespace-nowrap px-3.5 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                    {level.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLATFORM_MODULES.map((mod) => (
                <tr key={mod.id} className="border-b border-border-default last:border-0 hover:bg-surface-hover/60">
                  <td className="whitespace-nowrap px-3.5 py-2.5">
                    <span className="font-medium text-text-primary">{mod.label}</span>
                    {!mod.implemented && <span className="ml-1.5 text-[10.5px] text-text-tertiary">(planned)</span>}
                  </td>
                  {ACCESS_LEVELS.map((level) => (
                    <td key={level.key} className="px-3.5 py-2.5 text-center">
                      <Checkbox checked={state[mod.id]?.[level.key] ?? false} onChange={() => toggle(mod.id, level.key)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
