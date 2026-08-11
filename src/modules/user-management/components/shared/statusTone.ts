import type { StatusTone } from '@/types/common';
import type { AccountStatus } from '@/modules/user-management/types';

export const ACCOUNT_STATUS_TONE: Record<AccountStatus, StatusTone> = {
  active: 'success',
  disabled: 'neutral',
  locked: 'danger',
  pending: 'warning',
};

export const ACCOUNT_STATUS_LABEL: Record<AccountStatus, string> = {
  active: 'Active',
  disabled: 'Disabled',
  locked: 'Locked',
  pending: 'Pending',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function initials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}
