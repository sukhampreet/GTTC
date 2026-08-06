import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

import { buttonVariants } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';

export function AccessDeniedPage() {
  return (
    <div className="flex h-full min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-(--radius-lg) bg-danger-bg text-danger-400">
        <ShieldOff className="size-6" />
      </div>
      <div>
        <p className="text-lg font-semibold text-text-primary">Access Denied</p>
        <p className="mt-1 max-w-sm text-sm text-text-secondary">
          You don't have the required permissions to view this page.
        </p>
      </div>
      <Link to={ROUTES.dashboard} className={buttonVariants({ size: 'sm' })}>
        Back to Dashboard
      </Link>
    </div>
  );
}
