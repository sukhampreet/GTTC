import { useMemo, useState } from 'react';
import { Camera, Download, ImageOff } from 'lucide-react';

import { SearchBar } from '@/components/data/SearchBar';
import { FilterBar } from '@/components/data/FilterBar';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { snapshotRecords } from '@/modules/video-surveillance/mock';
import { titleCase } from '@/modules/video-surveillance/components/shared/statusTone';
import type { StatusTone } from '@/types/common';
import type { SnapshotRecord } from '@/modules/video-surveillance/types';

const TRIGGER_TONE: Record<SnapshotRecord['trigger'], StatusTone> = {
  manual: 'neutral',
  motion: 'warning',
  'ai-detection': 'info',
  scheduled: 'success',
};

export function SnapshotGallery() {
  const [query, setQuery] = useState('');
  const [trigger, setTrigger] = useState<'all' | SnapshotRecord['trigger']>('all');

  const filtered = useMemo(() => {
    return snapshotRecords.filter((s) => {
      const matchesQuery = !query.trim() || s.camera.toLowerCase().includes(query.trim().toLowerCase());
      const matchesTrigger = trigger === 'all' || s.trigger === trigger;
      return matchesQuery && matchesTrigger;
    });
  }, [query, trigger]);

  return (
    <div className="space-y-3">
      <FilterBar>
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by camera…" containerClassName="w-64" />
        <div className="flex flex-wrap items-center gap-1">
          {(['all', 'manual', 'motion', 'ai-detection', 'scheduled'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTrigger(t)}
              className={`rounded-(--radius-sm) px-2.5 py-1.5 text-[11.5px] font-medium transition-colors ${
                trigger === t ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              }`}
            >
              {t === 'all' ? 'All Triggers' : titleCase(t)}
            </button>
          ))}
        </div>
      </FilterBar>

      {filtered.length === 0 ? (
        <EmptyState icon={ImageOff} title="No snapshots found" description="No snapshots match the current search or filter." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((snap) => (
            <div key={snap.id} className="overflow-hidden rounded-(--radius-lg) border border-border-default bg-surface">
              <div className="relative flex aspect-video items-center justify-center bg-[repeating-linear-gradient(135deg,#0b0e14,#0b0e14_10px,#11151d_10px,#11151d_20px)]">
                <Camera className="size-5 text-white/15" />
                <StatusBadge tone={TRIGGER_TONE[snap.trigger]} className="absolute left-1.5 top-1.5 px-1.5 py-0">
                  {titleCase(snap.trigger)}
                </StatusBadge>
              </div>
              <div className="p-2.5">
                <p className="truncate text-[12px] font-medium text-text-primary">{snap.camera}</p>
                <p className="truncate text-[10.5px] text-text-tertiary">{snap.capturedAt} · {snap.resolution}</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <Download className="size-3" />
                  Export
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
