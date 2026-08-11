import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Percent, ScanSearch, Sparkles } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { ROUTES } from '@/constants/routes';
import { detectionCategoryMeta, detectionEvents } from '@/modules/video-surveillance/mock';
import { VIDEO_SURVEILLANCE_PATHS } from '@/modules/video-surveillance/constants/paths';
import { AlertTimeline } from '@/modules/video-surveillance/components/aiDetection/AlertTimeline';
import { HeatmapPlaceholder } from '@/modules/video-surveillance/components/aiDetection/HeatmapPlaceholder';
import { DETECTION_CATEGORY_ICON } from '@/modules/video-surveillance/components/aiDetection/categoryIcons';
import type { DetectionCategory } from '@/modules/video-surveillance/types';

export interface DetectionSubpageProps {
  category: DetectionCategory;
}

export function DetectionSubpage({ category }: DetectionSubpageProps) {
  const meta = detectionCategoryMeta.find((m) => m.category === category);
  const events = detectionEvents.filter((e) => e.category === category);
  const Icon = DETECTION_CATEGORY_ICON[category];

  return (
    <div>
      <Link
        to={`${ROUTES.videoSurveillance}/${VIDEO_SURVEILLANCE_PATHS.aiDetection}`}
        className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Back to AI Detection
      </Link>

      <PageHeader
        title={meta?.label ?? 'Detection'}
        description={meta?.description}
        actions={
          <div className="flex size-10 items-center justify-center rounded-(--radius-lg) bg-primary-900 text-primary-300">
            <Icon className="size-5" />
          </div>
        }
      />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Cameras Enabled" value={meta?.camerasEnabled ?? 0} icon={Camera} tone="info" />
          <StatCard label="Detections Today" value={meta?.detectionsToday ?? 0} icon={ScanSearch} tone={meta?.tone ?? 'neutral'} />
          <StatCard label="Model Accuracy" value={`${meta?.accuracyPct ?? 0}%`} icon={Percent} tone="success" />
          <StatCard label="Status" value="Active" icon={Sparkles} tone="success" hint="Placeholder module" />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <AlertTimeline events={events} title={`${meta?.label ?? 'Detection'} Events`} />
          <HeatmapPlaceholder title={`${meta?.label ?? 'Detection'} Heatmap`} />
        </div>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Model Integration</AppCardTitle>
          </AppCardHeader>
          <AppCardContent>
            <p className="text-[12.5px] leading-relaxed text-text-secondary">
              This is a professional placeholder for the {meta?.label} module. Detection events, confidence scores and
              the heatmap above are illustrated with representative mock data. No AI backend, model runtime or
              streaming pipeline is connected — inference wiring for this detection type is planned for a future
              sprint.
            </p>
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
