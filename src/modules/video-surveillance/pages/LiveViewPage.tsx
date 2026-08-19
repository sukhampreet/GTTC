import { useMemo, useState } from 'react';
import { Maximize2 } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/data/SearchBar';
import { cameraGroups } from '@/modules/video-surveillance/mock';
import { CameraGrid } from '@/modules/video-surveillance/components/liveView/CameraGrid';
import { GridLayoutSwitcher, type GridLayout } from '@/modules/video-surveillance/components/liveView/GridLayoutSwitcher';
import { useCameraRegistry } from '@/modules/video-surveillance/hooks/useCameraRegistry';
import { cn } from '@/utils/cn';

export function LiveViewPage() {
  const [layout, setLayout] = useState<GridLayout>(8);
  const [group, setGroup] = useState<string>('All');
  const [query, setQuery] = useState('');
  const { cameras } = useCameraRegistry();

  const filtered = useMemo(() => {
    return cameras.filter((camera) => {
      const matchesGroup = group === 'All' || camera.group === group;
      const matchesQuery = !query.trim() || camera.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesGroup && matchesQuery;
    });
  }, [cameras, group, query]);

  return (
    <div>
      <PageHeader
        title="Live View"
        description="Real-time monitoring grid across all 8 NVR channels. Channels registered via Camera Configuration → Add IP Cam stream live; unregistered channels show a placeholder."
        actions={
          <Button variant="outline" size="sm">
            <Maximize2 className="size-3.5" />
            Fullscreen
          </Button>
        }
      />

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-(--radius-md) border border-border-default bg-surface p-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cameras…" containerClassName="w-56" />
          <div className="flex flex-wrap items-center gap-1">
            {['All', ...cameraGroups.map((g) => g.name)].map((name) => (
              <button
                key={name}
                onClick={() => setGroup(name)}
                className={cn(
                  'rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors',
                  group === name
                    ? 'bg-primary-500/12 text-primary-300'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <GridLayoutSwitcher value={layout} onChange={setLayout} />
      </div>

      <CameraGrid cameras={filtered} layout={layout} />
    </div>
  );
}
