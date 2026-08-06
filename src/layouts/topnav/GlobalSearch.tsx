import { Search } from 'lucide-react';

export function GlobalSearch() {
  return (
    <button
      type="button"
      className="flex h-8 w-64 items-center gap-2 rounded-(--radius-md) border border-border-strong bg-surface-raised px-2.5 text-xs text-text-tertiary hover:border-border-focus lg:w-80"
      onClick={() => {}}
    >
      <Search className="size-3.5 shrink-0" />
      <span className="flex-1 text-left">Search cameras, devices, events…</span>
      <kbd className="rounded-(--radius-sm) border border-border-strong bg-surface px-1.5 py-0.5 text-[10px] text-text-tertiary">
        Ctrl K
      </kbd>
    </button>
  );
}
