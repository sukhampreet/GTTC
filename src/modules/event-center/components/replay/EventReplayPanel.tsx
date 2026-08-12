import { useState } from 'react';
import { PlayCircle, PauseCircle, SkipBack, SkipForward, Camera, Volume2 } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { events } from '@/modules/event-center/mock/events';
import { EVENT_SEVERITY_TONE, titleCase } from '@/modules/event-center/components/shared/statusTone';
import type { EventItem } from '@/modules/event-center/types';

export interface EventReplayPanelProps {
  events: EventItem[];
}

export function EventReplayPanel({ events: pool }: EventReplayPanelProps) {
  const [selected, setSelected] = useState<EventItem>(pool[0]);
  const [playing, setPlaying] = useState(false);
  const related = events.filter((e) => e.id !== selected.id && e.device === selected.device).slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard className="xl:col-span-2">
        <AppCardHeader>
          <AppCardTitle>Event Replay — {selected.id}</AppCardTitle>
          <StatusBadge tone={EVENT_SEVERITY_TONE[selected.severity]}>{titleCase(selected.severity)}</StatusBadge>
        </AppCardHeader>
        <AppCardContent>
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-(--radius-md) border border-border-strong bg-secondary-950">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[length:24px_24px]" />
            <div className="relative flex flex-col items-center gap-2 text-text-tertiary">
              <Camera className="size-10" />
              <p className="text-[12px]">Source: {selected.device} · Playback unavailable in this environment</p>
              <p className="font-mono text-[11px]">{selected.timestamp}</p>
            </div>
            {playing && (
              <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-(--radius-sm) bg-danger-bg px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-danger-400">
                <span className="size-1.5 animate-pulse rounded-full bg-danger-500" />
                Replaying
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPlaying(false)}>
              <SkipBack className="size-3.5" />
            </Button>
            <Button variant="primary" size="sm" onClick={() => setPlaying((p) => !p)}>
              {playing ? <PauseCircle className="size-4" /> : <PlayCircle className="size-4" />}
              {playing ? 'Pause' : 'Play'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPlaying(false)}>
              <SkipForward className="size-3.5" />
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Volume2 className="size-3.5" />
            </Button>
          </div>

          <div className="mt-4">
            <p className="mb-1.5 text-[11px] uppercase tracking-wide text-text-tertiary">Event Timeline</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
              <div className={cn('h-full rounded-full bg-primary-500 transition-all', playing ? 'w-1/2' : 'w-0')} />
            </div>
          </div>
        </AppCardContent>
      </AppCard>

      <div className="space-y-4">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Related Events</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="space-y-2">
            {related.length === 0 && <p className="text-[12px] text-text-tertiary">No related events for this device.</p>}
            {related.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelected(r);
                  setPlaying(false);
                }}
                className="w-full rounded-(--radius-md) border border-border-default bg-surface-raised p-2.5 text-left transition-colors hover:border-primary-500/60 hover:bg-surface-hover"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-text-tertiary">{r.id}</span>
                  <StatusBadge tone={EVENT_SEVERITY_TONE[r.severity]} dot={false}>
                    {titleCase(r.severity)}
                  </StatusBadge>
                </div>
                <p className="mt-1 text-[12.5px] text-text-primary">{r.eventType}</p>
              </button>
            ))}
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Select Event</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="max-h-64 space-y-1.5 overflow-y-auto">
            {pool.slice(0, 12).map((e) => (
              <button
                key={e.id}
                onClick={() => {
                  setSelected(e);
                  setPlaying(false);
                }}
                className={cn(
                  'w-full rounded-(--radius-sm) px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-surface-hover',
                  e.id === selected.id ? 'bg-primary-500/12 text-primary-300' : 'text-text-secondary',
                )}
              >
                {e.id} — {e.eventType}
              </button>
            ))}
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
