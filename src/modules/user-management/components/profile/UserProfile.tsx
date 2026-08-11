import { Fingerprint, KeyRound, Mail, Phone, ShieldCheck, ShieldX } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Avatar } from '@/components/ui/Avatar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { userActivityRecords } from '@/modules/user-management/mock';
import { PLATFORM_MODULES } from '@/modules/user-management/constants/platformModules';
import { DEFAULT_ROLE_PERMISSION_MATRICES } from '@/modules/user-management/mock/permissionMatrix';
import { ACCOUNT_STATUS_LABEL, ACCOUNT_STATUS_TONE, initials } from '@/modules/user-management/components/shared/statusTone';
import type { ManagedUser } from '@/modules/user-management/types';

export interface UserProfileProps {
  user: ManagedUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const matrix = DEFAULT_ROLE_PERMISSION_MATRICES[user.role];
  const assignedModules = PLATFORM_MODULES.filter((m) => Object.values(matrix[m.id] ?? {}).some(Boolean));
  const activity = userActivityRecords.filter((a) => a.user === user.username).slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard className="xl:col-span-1">
        <AppCardContent className="flex flex-col items-center gap-3 py-6 text-center">
          <Avatar initials={initials(user.fullName)} size="md" className="size-16 text-lg" />
          <div>
            <p className="text-[15px] font-semibold text-text-primary">{user.fullName}</p>
            <p className="text-[12px] text-text-tertiary">@{user.username} · {user.designation}</p>
          </div>
          <StatusBadge tone={ACCOUNT_STATUS_TONE[user.status]}>{ACCOUNT_STATUS_LABEL[user.status]}</StatusBadge>

          <div className="mt-2 w-full space-y-2 border-t border-border-default pt-4 text-left text-[12.5px] text-text-secondary">
            <p className="flex items-center gap-2"><Mail className="size-3.5 text-text-tertiary" /> {user.email}</p>
            <p className="flex items-center gap-2"><Phone className="size-3.5 text-text-tertiary" /> {user.phone}</p>
            <p className="flex items-center gap-2"><ShieldCheck className="size-3.5 text-text-tertiary" /> {user.department}</p>
          </div>
        </AppCardContent>
      </AppCard>

      <div className="space-y-4 xl:col-span-2">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Security</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-[11px] text-text-tertiary">Password Status</p>
              <p className="text-[13px] font-medium text-text-primary">{user.lastPasswordChange === '—' ? 'Not set' : 'Set'}</p>
            </div>
            <div>
              <p className="text-[11px] text-text-tertiary">Last Password Change</p>
              <p className="text-[13px] font-medium text-text-primary">{user.lastPasswordChange}</p>
            </div>
            <div>
              <p className="text-[11px] text-text-tertiary">MFA Status</p>
              <p className="flex items-center gap-1 text-[13px] font-medium">
                {user.mfaEnabled ? (
                  <><Fingerprint className="size-3.5 text-success-400" /> <span className="text-success-400">Enabled</span></>
                ) : (
                  <><ShieldX className="size-3.5 text-text-tertiary" /> <span className="text-text-tertiary">Disabled</span></>
                )}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-text-tertiary">Failed Login Attempts</p>
              <p className={`text-[13px] font-medium ${user.failedLoginAttempts > 2 ? 'text-danger-400' : 'text-text-primary'}`}>
                {user.failedLoginAttempts}
              </p>
            </div>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Access</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[12.5px]">
              <span className="text-text-tertiary">Role:</span>
              <StatusBadge tone="info" dot={false}>{user.role}</StatusBadge>
              <span className="text-text-tertiary">Access Group:</span>
              <StatusBadge tone="neutral" dot={false}>{user.accessGroup}</StatusBadge>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] uppercase tracking-wide text-text-tertiary">Assigned Modules ({assignedModules.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {assignedModules.map((m) => (
                  <span key={m.id} className="rounded-(--radius-sm) bg-surface-hover px-2 py-1 text-[11px] text-text-secondary">
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Recent Activity</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="p-0">
            {activity.length === 0 ? (
              <p className="px-4 py-6 text-center text-[12px] text-text-tertiary">No recent activity recorded for this user.</p>
            ) : (
              <ul className="divide-y divide-border-default">
                {activity.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <KeyRound className="size-3.5 text-text-tertiary" />
                      <div>
                        <p className="text-[12.5px] font-medium text-text-primary">{a.action}</p>
                        <p className="text-[11px] text-text-tertiary">{a.module}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-text-tertiary">{a.timestamp}</span>
                  </li>
                ))}
              </ul>
            )}
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
