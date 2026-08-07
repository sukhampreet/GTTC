import { cn } from '@/utils/cn';

export interface SparklineProps {
  data: number[];
  className?: string;
  strokeClassName?: string;
}

/**
 * Minimal dependency-free sparkline. Kept local to the dashboard so KPI cards
 * stay cheap to render (13 of them) without pulling a full Recharts container
 * into every card.
 */
export function Sparkline({ data, className, strokeClassName }: SparklineProps) {
  if (data.length < 2) return null;

  const width = 100;
  const height = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn('h-7 w-full', className)}
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('stroke-current text-primary-500/70', strokeClassName)}
      />
    </svg>
  );
}
