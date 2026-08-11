import { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Home,
  Minus,
  Plus,
  Route,
  Star,
} from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import { ptzCameras, ptzPatrols, ptzPresets } from '@/modules/video-surveillance/mock';
import { CameraTile } from '@/modules/video-surveillance/components/liveView/CameraTile';

export function PTZPanel() {
  const [activeCameraId, setActiveCameraId] = useState(ptzCameras[0]?.id ?? '');
  const activeCamera = ptzCameras.find((c) => c.id === activeCameraId) ?? ptzCameras[0];

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {activeCamera && (
          <div className="aspect-video w-full overflow-hidden rounded-(--radius-lg) border border-border-default">
            <CameraTile camera={activeCamera} />
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 rounded-(--radius-md) border border-border-default bg-surface p-2">
          {ptzCameras.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCameraId(c.id)}
              className={cn(
                'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors',
                activeCameraId === c.id
                  ? 'bg-primary-500/12 text-primary-300'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Directional Control</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-1.5">
              <span />
              <Button variant="outline" size="sm" className="aspect-square"><ArrowUp className="size-4" /></Button>
              <span />
              <Button variant="outline" size="sm" className="aspect-square"><ArrowLeft className="size-4" /></Button>
              <Button variant="secondary" size="sm" className="aspect-square" title="Home"><Home className="size-4" /></Button>
              <Button variant="outline" size="sm" className="aspect-square"><ArrowRight className="size-4" /></Button>
              <span />
              <Button variant="outline" size="sm" className="aspect-square"><ArrowDown className="size-4" /></Button>
              <span />
            </div>

            <div className="grid w-full grid-cols-2 gap-3">
              <div>
                <p className="mb-1.5 text-center text-[11px] uppercase tracking-wide text-text-tertiary">Zoom</p>
                <div className="flex items-center justify-center gap-1.5">
                  <Button variant="outline" size="sm"><Minus className="size-3.5" /></Button>
                  <Button variant="outline" size="sm"><Plus className="size-3.5" /></Button>
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-center text-[11px] uppercase tracking-wide text-text-tertiary">Focus</p>
                <div className="flex items-center justify-center gap-1.5">
                  <Button variant="outline" size="sm"><Minus className="size-3.5" /></Button>
                  <Button variant="outline" size="sm"><Plus className="size-3.5" /></Button>
                </div>
              </div>
            </div>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Presets</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="p-0">
            <ul className="divide-y divide-border-default">
              {ptzPresets
                .filter((p) => p.camera === activeCamera?.name)
                .map((preset) => (
                  <li key={preset.id} className="flex items-center justify-between gap-3 px-4 py-2">
                    <span className="flex items-center gap-2 text-[12.5px] text-text-primary">
                      <Star className="size-3.5 text-text-tertiary" />
                      {preset.name}
                    </span>
                    <Button variant="ghost" size="sm">Go</Button>
                  </li>
                ))}
              {ptzPresets.filter((p) => p.camera === activeCamera?.name).length === 0 && (
                <li className="px-4 py-3 text-[12px] text-text-tertiary">No presets saved for this camera.</li>
              )}
            </ul>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Patrol</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="p-0">
            <ul className="divide-y divide-border-default">
              {ptzPatrols.map((patrol) => (
                <li key={patrol.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <Route className="size-3.5 text-text-tertiary" />
                    <div>
                      <p className="text-[12.5px] font-medium text-text-primary">{patrol.name}</p>
                      <p className="text-[11px] text-text-tertiary">{patrol.presetCount} presets · every {patrol.intervalSec}s</p>
                    </div>
                  </div>
                  <StatusBadge tone={patrol.active ? 'success' : 'neutral'}>{patrol.active ? 'Active' : 'Stopped'}</StatusBadge>
                </li>
              ))}
            </ul>
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
