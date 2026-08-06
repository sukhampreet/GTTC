import { useNow } from '@/hooks/useNow';

export function LiveClock() {
  const now = useNow();

  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="hidden flex-col items-end leading-tight md:flex">
      <span className="text-xs font-medium tabular-nums text-text-primary">{time}</span>
      <span className="text-[10px] text-text-tertiary">{date}</span>
    </div>
  );
}
