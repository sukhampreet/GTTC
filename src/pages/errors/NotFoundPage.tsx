import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

import { buttonVariants } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';

export function NotFoundPage() {
  return (
    <div className="flex h-full min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-(--radius-lg) border border-border-default bg-surface text-text-tertiary">
        <Compass className="size-6" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-text-primary">404</p>
        <p className="mt-1 text-sm text-text-secondary">The page you're looking for doesn't exist.</p>
      </div>
      <Link to={ROUTES.dashboard} className={buttonVariants({ size: 'sm' })}>
        Back to Dashboard
      </Link>
    </div>
  );
}
