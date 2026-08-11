import { AlarmClock, Percent, ScanSearch, TrendingUp } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { detectionCategoryMeta, detectionEvents } from '@/modules/video-surveillance/mock';

export function DetectionOverview() {
  const totalToday = detectionCategoryMeta.reduce((sum, c) => sum + c.detectionsToday, 0);
  const avgAccuracy = (
    detectionCategoryMeta.reduce((sum, c) => sum + c.accuracyPct, 0) / detectionCategoryMeta.length
  ).toFixed(1);
  const newEvents = detectionEvents.filter((e) => e.status === 'new').length;
  const activeCategories = detectionCategoryMeta.filter((c) => c.camerasEnabled > 0).length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Detections Today" value={totalToday} icon={ScanSearch} tone="info" />
      <StatCard label="Average Accuracy" value={`${avgAccuracy}%`} icon={Percent} tone="success" />
      <StatCard label="New Alerts" value={newEvents} icon={AlarmClock} tone="warning" hint="Awaiting review" />
      <StatCard label="Active Detection Types" value={`${activeCategories}/10`} icon={TrendingUp} tone="neutral" />
    </div>
  );
}
