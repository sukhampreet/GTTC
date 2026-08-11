import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { detectionCategoryMeta } from '@/modules/video-surveillance/mock';
import { VIDEO_SURVEILLANCE_PATHS, AI_DETECTION_PATHS } from '@/modules/video-surveillance/constants/paths';
import { DETECTION_CATEGORY_ICON } from '@/modules/video-surveillance/components/aiDetection/categoryIcons';

const CATEGORY_PATH: Record<string, string> = {
  person: AI_DETECTION_PATHS.person,
  vehicle: AI_DETECTION_PATHS.vehicle,
  face: AI_DETECTION_PATHS.face,
  weapon: AI_DETECTION_PATHS.weapon,
  fire: AI_DETECTION_PATHS.fire,
  intrusion: AI_DETECTION_PATHS.intrusion,
  crowd: AI_DETECTION_PATHS.crowd,
  helmet: AI_DETECTION_PATHS.helmet,
  ppe: AI_DETECTION_PATHS.ppe,
  'line-crossing': AI_DETECTION_PATHS.lineCrossing,
};

export function DetectionCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {detectionCategoryMeta.map((meta) => {
        const Icon = DETECTION_CATEGORY_ICON[meta.category];
        return (
          <Link
            key={meta.category}
            to={`${ROUTES.videoSurveillance}/${VIDEO_SURVEILLANCE_PATHS.aiDetection}/${CATEGORY_PATH[meta.category]}`}
            className="flex flex-col gap-2.5 rounded-(--radius-lg) border border-border-default bg-surface p-3.5 transition-colors hover:border-primary-500/60 hover:bg-surface-hover"
          >
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-(--radius-md) bg-primary-900 text-primary-300">
                <Icon className="size-4.5" />
              </div>
              <StatusBadge tone={meta.tone} className="px-1.5 py-0">
                {meta.camerasEnabled} cams
              </StatusBadge>
            </div>
            <div>
              <p className="text-[13px] font-medium text-text-primary">{meta.label}</p>
              <p className="mt-0.5 line-clamp-2 text-[11px] text-text-tertiary">{meta.description}</p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-text-tertiary">
              <span>{meta.detectionsToday} today</span>
              <span className="font-medium text-text-secondary">{meta.accuracyPct}% acc.</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
