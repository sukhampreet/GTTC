import { Video } from 'lucide-react';

import { cn } from '@/utils/cn';
import type { CameraRecord } from '@/modules/video-surveillance/types';
import { CameraTile } from '@/modules/video-surveillance/components/liveView/CameraTile';
import { gridColumnsClass, type GridLayout } from '@/modules/video-surveillance/components/liveView/GridLayoutSwitcher';

export interface CameraGridProps {
  cameras: CameraRecord[];
  layout: GridLayout;
}

export function CameraGrid({ cameras, layout }: CameraGridProps) {
  const slots = Array.from({ length: layout }, (_, i) => cameras[i]);

  return (
    <div className={cn('grid gap-2', gridColumnsClass(layout))}>
      {slots.map((camera, index) =>
        camera ? (
          <CameraTile key={camera.id} camera={camera} dense={layout >= 16} />
        ) : (
          <div
            key={`empty-${index}`}
            className="flex aspect-video items-center justify-center rounded-(--radius-md) border border-dashed border-border-strong bg-surface-raised/40"
          >
            <Video className="size-4 text-text-tertiary/40" />
          </div>
        ),
      )}
    </div>
  );
}
