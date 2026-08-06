import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';

export function Breadcrumb() {
  const items = useBreadcrumbs();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex h-9 shrink-0 items-center gap-1.5 border-b border-border-default bg-canvas px-4 text-xs text-text-tertiary"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && <ChevronRight className="size-3" />}
            {item.path && !isLast ? (
              <Link to={item.path} className="hover:text-text-primary">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-text-secondary' : undefined}>{item.label}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
