import { RemoteDoorCard } from '@/modules/building-intercom/components/remoteUnlock/RemoteDoorCard';
import type { RemoteDoor } from '@/modules/building-intercom/types';

export interface RemoteUnlockPanelProps {
  doors: RemoteDoor[];
}

export function RemoteUnlockPanel({ doors }: RemoteUnlockPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {doors.map((door) => (
        <RemoteDoorCard key={door.id} door={door} />
      ))}
    </div>
  );
}
