import { Disc, Download, Lock, Play } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import type { RecordingEntry } from '@/modules/video-surveillance/types';
import type { StatusTone } from '@/types/common';

const TYPE_TONE: Record<RecordingEntry['type'], StatusTone> = {
  continuous: 'info',
  motion: 'warning',
  'ai-event': 'danger',
  manual: 'neutral',
};

export interface RecordingListPanelProps {
  recordings: RecordingEntry[];
}

export function RecordingListPanel({ recordings }: RecordingListPanelProps) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Recordings</AppCardTitle>
        <span className="text-[11px] text-text-tertiary">{recordings.length} results</span>
      </AppCardHeader>
      <AppCardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {recordings.map((rec) => (
            <li key={rec.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-(--radius-md) bg-surface-hover text-text-secondary">
                  <Disc className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-medium text-text-primary">{rec.camera}</p>
                  <p className="truncate text-[11px] text-text-tertiary">
                    {rec.date} · {rec.startTime}–{rec.endTime} · {rec.durationMin} min · {rec.sizeGb} GB
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {rec.locked && <Lock className="size-3 text-text-tertiary" />}
                <StatusBadge tone={TYPE_TONE[rec.type]} className="px-1.5 py-0">
                  {rec.type}
                </StatusBadge>
                <Button variant="ghost" size="sm" title="Play">
                  <Play className="size-3.5" />
                </Button>
                <Button variant="ghost" size="sm" title="Export (placeholder)">
                  <Download className="size-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
