import { useState } from 'react';
import { Pause, Play, Rewind, FastForward, SkipBack, SkipForward, Volume2 } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const SPEEDS = ['0.5x', '1x', '2x', '4x', '8x'];

export function PlaybackControls() {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-(--radius-md) border border-border-default bg-surface p-2.5">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" title="Previous recording">
          <SkipBack className="size-3.5" />
        </Button>
        <Button variant="ghost" size="sm" title="Rewind">
          <Rewind className="size-3.5" />
        </Button>
        <Button variant="primary" size="sm" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {playing ? 'Pause' : 'Play'}
        </Button>
        <Button variant="ghost" size="sm" title="Fast forward">
          <FastForward className="size-3.5" />
        </Button>
        <Button variant="ghost" size="sm" title="Next recording">
          <SkipForward className="size-3.5" />
        </Button>
      </div>

      <div className="flex items-center gap-1 rounded-(--radius-md) border border-border-default p-0.5">
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={cn(
              'rounded-(--radius-sm) px-2 py-1 text-[11px] font-medium transition-colors',
              speed === s ? 'bg-primary-500/15 text-primary-300' : 'text-text-secondary hover:bg-surface-hover',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-text-tertiary">
        <Volume2 className="size-3.5" />
        <input type="range" defaultValue={70} className="h-1 w-20 accent-primary-500" />
      </div>
    </div>
  );
}
