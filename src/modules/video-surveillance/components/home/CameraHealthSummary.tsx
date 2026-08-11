import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { healthDistribution } from '@/modules/video-surveillance/mock';
import { VIDEO_SURVEILLANCE_PATHS } from '@/modules/video-surveillance/constants/paths';

const BAR_TONE: Record<string, string> = {
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  neutral: 'bg-text-tertiary',
  info: 'bg-info-500',
};

export function CameraHealthSummary() {
  const total = healthDistribution.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Camera Health</AppCardTitle>
        <Link
          to={`${ROUTES.videoSurveillance}/${VIDEO_SURVEILLANCE_PATHS.cameraHealth}`}
          className="inline-flex items-center gap-1 text-[11.5px] font-medium text-primary-300 hover:text-primary-200"
        >
          View details
          <ArrowRight className="size-3" />
        </Link>
      </AppCardHeader>
      <AppCardContent className="space-y-3">
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-hover">
          {healthDistribution.map((slice) => (
            <div
              key={slice.name}
              className={BAR_TONE[slice.tone]}
              style={{ width: `${total ? (slice.value / total) * 100 : 0}%` }}
            />
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {healthDistribution.map((slice) => (
            <li key={slice.name} className="flex items-center gap-2 text-[12px] text-text-secondary">
              <span className={`size-2 shrink-0 rounded-full ${BAR_TONE[slice.tone]}`} />
              {slice.name} — <span className="font-medium text-text-primary">{slice.value}</span>
            </li>
          ))}
        </ul>
      </AppCardContent>
    </AppCard>
  );
}
