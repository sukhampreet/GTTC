import type { UserRole } from '@/types/auth';
import { PLATFORM_MODULES } from '@/modules/user-management/constants/platformModules';
import type { PermissionMatrixState } from '@/modules/user-management/types';

function buildMatrix(grantedModuleIds: Set<string> | 'all', deniedKeys: Set<string> = new Set()): PermissionMatrixState {
  const matrix: PermissionMatrixState = {};
  for (const mod of PLATFORM_MODULES) {
    const moduleGranted = grantedModuleIds === 'all' || grantedModuleIds.has(mod.id);
    matrix[mod.id] = {};
    for (const perm of mod.permissions) {
      const key = `${mod.id}:${perm.key}`;
      matrix[mod.id][perm.key] = moduleGranted && !deniedKeys.has(key);
    }
  }
  return matrix;
}

/** Administrator: every module, every permission. */
const administratorMatrix = buildMatrix('all');

/** Supervisor: broad operational access, but not system-configuration or destructive settings actions. */
const supervisorMatrix = buildMatrix(
  new Set([
    'dashboard',
    'live-monitoring',
    'video-surveillance',
    'access-control',
    'building-intercom',
    'fire-emergency',
    'smart-parking',
    'environment-monitoring',
    'event-center',
    'device-management',
    'ai-analytics',
    'reports',
  ]),
);

/** Operator: day-to-day monitoring modules only. */
const operatorMatrix = buildMatrix(
  new Set(['dashboard', 'live-monitoring', 'video-surveillance', 'access-control', 'smart-parking', 'event-center']),
);

/** Security Officer: frontline live-view and access/event response only. */
const securityOfficerMatrix = buildMatrix(
  new Set(['dashboard', 'video-surveillance', 'access-control', 'event-center']),
  new Set(['video-surveillance:configuration', 'access-control:configuration']),
);

export const DEFAULT_ROLE_PERMISSION_MATRICES: Record<UserRole, PermissionMatrixState> = {
  Administrator: administratorMatrix,
  Supervisor: supervisorMatrix,
  Operator: operatorMatrix,
  'Security Officer': securityOfficerMatrix,
};
