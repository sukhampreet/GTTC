import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';

// Deterministic pseudo-random intensity grid so the placeholder looks like a
// real detection density heatmap without depending on backend data.
function intensityAt(row: number, col: number): number {
  const seed = Math.sin(row * 12.9898 + col * 78.233) * 43758.5453;
  return Math.abs(seed - Math.floor(seed));
}

function colorForIntensity(value: number): string {
  if (value > 0.82) return 'bg-danger-500/70';
  if (value > 0.62) return 'bg-warning-500/60';
  if (value > 0.4) return 'bg-primary-500/40';
  if (value > 0.2) return 'bg-primary-500/20';
  return 'bg-surface-hover';
}

export interface HeatmapPlaceholderProps {
  title?: string;
  rows?: number;
  cols?: number;
}

export function HeatmapPlaceholder({ title = 'Detection Heatmap', rows = 8, cols = 16 }: HeatmapPlaceholderProps) {
  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>{title}</AppCardTitle>
        <span className="text-[11px] text-text-tertiary">Density placeholder — model integration pending</span>
      </AppCardHeader>
      <AppCardContent>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: rows * cols }, (_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const value = intensityAt(row, col);
            return <div key={i} className={`aspect-square rounded-[2px] ${colorForIntensity(value)}`} />;
          })}
        </div>
        <div className="mt-3 flex items-center gap-4 text-[11px] text-text-tertiary">
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-surface-hover" /> Low</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-primary-500/40" /> Moderate</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-warning-500/60" /> High</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-danger-500/70" /> Critical</span>
        </div>
      </AppCardContent>
    </AppCard>
  );
}
