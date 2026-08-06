export function Footer() {
  return (
    <footer className="flex h-(--footer-height) shrink-0 items-center justify-between border-t border-border-default bg-surface px-4 text-[11px] text-text-tertiary">
      <span>&copy; {new Date().getFullYear()} GTTC Indigenous Smart Security Central Control Platform</span>
      <span>v1.0.0 · Sprint 1</span>
    </footer>
  );
}
