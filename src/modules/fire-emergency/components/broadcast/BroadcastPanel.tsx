import { useState } from 'react';
import { Pause, Play, Radio, Square } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/utils/cn';
import type { BroadcastGroup, BroadcastPlayState } from '@/modules/fire-emergency/types';

export interface BroadcastPanelProps {
  groups: BroadcastGroup[];
  messagePresets: readonly string[];
}

export function BroadcastPanel({ groups, messagePresets }: BroadcastPanelProps) {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id ?? '');
  const [message, setMessage] = useState(messagePresets[0] ?? '');
  const [volume, setVolume] = useState(70);
  const [playState, setPlayState] = useState<BroadcastPlayState>('idle');

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) ?? groups[0];

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard className="xl:col-span-2">
        <AppCardHeader>
          <AppCardTitle>Broadcast Groups</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-2">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroupId(group.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-(--radius-md) border px-3.5 py-2.5 text-left transition-colors',
                selectedGroupId === group.id
                  ? 'border-primary-500/60 bg-primary-500/10'
                  : 'border-border-default bg-surface-raised hover:bg-surface-hover',
              )}
            >
              <div>
                <p className="text-[13px] font-medium text-text-primary">{group.name}</p>
                <p className="text-[11px] text-text-tertiary">{group.zones.join(', ')} · {group.deviceCount} speakers</p>
              </div>
              {selectedGroupId === group.id && <StatusBadge tone="info">Selected</StatusBadge>}
            </button>
          ))}
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Broadcast Status</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-3">
          <StatusBadge tone={playState === 'playing' ? 'danger' : playState === 'paused' ? 'warning' : 'success'}>
            {playState === 'playing' ? 'Broadcasting' : playState === 'paused' ? 'Paused' : 'Standby'}
          </StatusBadge>
          <p className="text-[11px] text-text-tertiary">Target: {selectedGroup?.name ?? '—'}</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setPlayState('playing')} disabled={playState === 'playing'}>
              <Play className="size-3.5" />
              Play
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPlayState('paused')} disabled={playState !== 'playing'}>
              <Pause className="size-3.5" />
              Pause
            </Button>
            <Button variant="danger" size="sm" onClick={() => setPlayState('idle')} disabled={playState === 'idle'}>
              <Square className="size-3.5" />
              Stop
            </Button>
          </div>
        </AppCardContent>
      </AppCard>

      <AppCard className="xl:col-span-2">
        <AppCardHeader>
          <AppCardTitle>Message Preview</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {messagePresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setMessage(preset)}
                className={cn(
                  'rounded-(--radius-sm) border px-2.5 py-1 text-[11px] font-medium transition-colors',
                  message === preset
                    ? 'border-primary-500/60 bg-primary-500/10 text-primary-300'
                    : 'border-border-default bg-surface-raised text-text-secondary hover:bg-surface-hover',
                )}
              >
                {preset.length > 28 ? `${preset.slice(0, 28)}…` : preset}
              </button>
            ))}
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full rounded-(--radius-md) border border-border-strong bg-surface-raised px-3 py-2 text-[13px] text-text-primary focus:border-primary-500"
          />
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Volume &amp; Schedule</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-[11px] text-text-tertiary">
              <span className="inline-flex items-center gap-1">
                <Radio className="size-3" />
                Volume
              </span>
              <span className="tabular-nums text-text-secondary">{volume}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--color-primary-500)]"
            />
          </div>
          <div>
            <p className="text-[11px] text-text-tertiary">Scheduled Broadcast</p>
            <p className="mt-1 text-[13px] text-text-secondary">None scheduled</p>
          </div>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
