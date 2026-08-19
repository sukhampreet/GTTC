import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/utils/cn';
import { ConfigurationTabs } from '@/modules/video-surveillance/components/configuration/ConfigurationTabs';
import { useCameraRegistry } from '@/modules/video-surveillance/hooks/useCameraRegistry';

export function CameraConfigurationPage() {
  const { cameras } = useCameraRegistry();
  const [cameraId, setCameraId] = useState(cameras[0]?.id ?? '');

  // cameras[0]'s id can change (e.g. right after Channel 1 is
  // added/removed on first load); keep the selection valid.
  useEffect(() => {
    if (cameras.length > 0 && !cameras.some((c) => c.id === cameraId)) {
      setCameraId(cameras[0].id);
    }
  }, [cameras, cameraId]);

  return (
    <div>
      <PageHeader
        title="Camera Configuration"
        description="Per-camera configuration across network, video, audio, AI, recording, storage and maintenance settings."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
        <div className="h-fit rounded-(--radius-lg) border border-border-default bg-surface p-2">
          <p className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Cameras</p>
          <ul className="max-h-[560px] space-y-0.5 overflow-y-auto">
            {cameras.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setCameraId(c.id)}
                  className={cn(
                    'w-full truncate rounded-(--radius-sm) px-2.5 py-1.5 text-left text-[12.5px] font-medium transition-colors',
                    cameraId === c.id
                      ? 'bg-primary-500/12 text-primary-300'
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                  )}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ConfigurationTabs cameraId={cameraId} />
      </div>
    </div>
  );
}
