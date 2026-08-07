import { DoorOpen, DoorClosed, ShieldAlert, LogIn, LogOut, Unlock } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { accessStatusSnapshot } from '@/modules/live-monitoring/mock/access';

/** Real-time access monitoring panel — UI only, no live device control. */
export function AccessWidget() {
  const snapshot = accessStatusSnapshot;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Doors Open" value={snapshot.doorsOpen} icon={DoorOpen} tone="warning" />
        <StatCard label="Doors Closed" value={snapshot.doorsClosed} icon={DoorClosed} tone="success" />
        <StatCard label="Unauthorized Attempts" value={snapshot.unauthorizedAttempts} icon={ShieldAlert} tone="danger" />
        <StatCard label="Current Entries" value={snapshot.currentEntries} icon={LogIn} tone="info" />
        <StatCard label="Current Exits" value={snapshot.currentExits} icon={LogOut} tone="info" />
        <StatCard label="Emergency Unlock" value={snapshot.emergencyUnlockActive ? 'Active' : 'Standby'} icon={Unlock} tone={snapshot.emergencyUnlockActive ? 'danger' : 'neutral'} />
      </div>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Emergency Unlock Status</AppCardTitle>
        </AppCardHeader>
        <AppCardContent>
          <div className="flex items-center justify-between">
            <p className="text-[12.5px] text-text-secondary">
              Campus-wide emergency unlock override for all monitored doors.
            </p>
            <StatusBadge tone={snapshot.emergencyUnlockActive ? 'danger' : 'success'}>
              {snapshot.emergencyUnlockActive ? 'Engaged' : 'Standby'}
            </StatusBadge>
          </div>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
