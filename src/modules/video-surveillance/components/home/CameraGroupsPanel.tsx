import { Layers } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { cameraGroups } from '@/modules/video-surveillance/mock';

export function CameraGroupsPanel() {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Camera Groups</AppCardTitle>
      </AppCardHeader>
      <AppCardContent className="grid grid-cols-2 gap-2">
        {cameraGroups.map((group) => (
          <div key={group.id} className="flex items-center gap-2.5 rounded-(--radius-md) border border-border-default bg-surface-raised p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-(--radius-md) bg-primary-900 text-primary-300">
              <Layers className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-text-primary">{group.name}</p>
              <p className="truncate text-[11px] text-text-tertiary">
                {group.onlineCount}/{group.cameraCount} online
              </p>
            </div>
          </div>
        ))}
      </AppCardContent>
    </AppCard>
  );
}
