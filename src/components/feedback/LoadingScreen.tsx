import { ShieldCheck } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-canvas">
      <div className="flex size-12 items-center justify-center rounded-(--radius-lg) border border-primary-600/40 bg-primary-900 text-primary-300">
        <ShieldCheck className="size-6 animate-pulse" />
      </div>
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <span className="size-1.5 animate-pulse rounded-full bg-primary-500" />
        Initializing platform…
      </div>
    </div>
  );
}
