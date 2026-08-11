import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/utils/cn';
import { managedUsers } from '@/modules/user-management/mock';
import { UserProfile } from '@/modules/user-management/components/profile/UserProfile';
import { initials } from '@/modules/user-management/components/shared/statusTone';
import { Avatar } from '@/components/ui/Avatar';

export function UserProfilePage() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('user');
  const [userId, setUserId] = useState(preselected ?? managedUsers[0]?.id ?? '');

  const selectedUser = useMemo(() => managedUsers.find((u) => u.id === userId) ?? managedUsers[0], [userId]);

  return (
    <div>
      <PageHeader title="User Profile" description="Detailed profile, security posture, access and recent activity for a selected user." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
        <div className="h-fit rounded-(--radius-lg) border border-border-default bg-surface p-2">
          <p className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Users</p>
          <ul className="max-h-[560px] space-y-0.5 overflow-y-auto">
            {managedUsers.map((u) => (
              <li key={u.id}>
                <button
                  onClick={() => setUserId(u.id)}
                  className={cn(
                    'flex w-full items-center gap-2 truncate rounded-(--radius-sm) px-2 py-1.5 text-left text-[12.5px] font-medium transition-colors',
                    userId === u.id
                      ? 'bg-primary-500/12 text-primary-300'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                  )}
                >
                  <Avatar initials={initials(u.fullName)} size="sm" />
                  <span className="truncate">{u.fullName}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedUser && <UserProfile user={selectedUser} />}
      </div>
    </div>
  );
}
