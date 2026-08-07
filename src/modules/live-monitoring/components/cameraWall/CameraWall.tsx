import { useMemo, useState } from 'react';

import { liveCameras } from '@/modules/live-monitoring/mock/liveCameras';
import type { CameraWallLayout } from '@/modules/live-monitoring/types';
import { CameraCard } from '@/modules/live-monitoring/components/cameraWall/CameraCard';
import { LayoutSwitcher } from '@/modules/live-monitoring/components/cameraWall/LayoutSwitcher';

const GRID_CLASSES: Record<CameraWallLayout, string> = {
  1: 'grid-cols-1',
  4: 'grid-cols-2',
  9: 'grid-cols-3',
  16: 'grid-cols-4',
  25: 'grid-cols-5',
  36: 'grid-cols-6',
};

/** Enterprise CCTV wall — supports 1/4/9/16/25/36 tile layouts. Video is a placeholder only. */
export function CameraWall() {
  const [layout, setLayout] = useState<CameraWallLayout>(9);

  const tiles = useMemo(() => liveCameras.slice(0, layout), [layout]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[12px] text-text-tertiary">
          Showing {tiles.length} of {liveCameras.length} cameras
        </p>
        <LayoutSwitcher value={layout} onChange={setLayout} />
      </div>

      <div className={`grid gap-2 ${GRID_CLASSES[layout]}`}>
        {tiles.map((camera) => (
          <CameraCard key={camera.id} camera={camera} compact={layout >= 25} />
        ))}
      </div>
    </div>
  );
}
