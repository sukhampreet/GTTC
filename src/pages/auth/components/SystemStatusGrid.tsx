import { systemStatusMetrics } from '@/mock/systemStatus';
import { cn } from '@/utils/cn';

const TONE_CLASSES: Record<'success' | 'info' | 'neutral', string> = {
  success: 'text-success-400',
  info: 'text-accent-300',
  neutral: 'text-text-secondary',
};

export function SystemStatusGrid() {
  const deviceMetrics = systemStatusMetrics.slice(0, 4);
  const healthMetrics = systemStatusMetrics.slice(4);

  return (
    <div className="space-y-px overflow-hidden rounded-(--radius-md) border border-white/10 bg-white/10">
      <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
        {deviceMetrics.map((metric) => (
          <div key={metric.id} className="bg-[#0a0d13]/60 px-3 py-2.5 backdrop-blur-sm">
            <p className="text-[10px] font-medium uppercase tracking-wide text-white/45">{metric.label}</p>
            <p className={cn('mt-1 text-base font-semibold tabular-nums', TONE_CLASSES[metric.tone])}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-px">
        {healthMetrics.map((metric) => (
          <div key={metric.id} className="bg-[#0a0d13]/60 px-3 py-2.5 backdrop-blur-sm">
            <p className="text-[10px] font-medium uppercase tracking-wide text-white/45">{metric.label}</p>
            <p className={cn('mt-1 text-base font-semibold tabular-nums', TONE_CLASSES[metric.tone])}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
