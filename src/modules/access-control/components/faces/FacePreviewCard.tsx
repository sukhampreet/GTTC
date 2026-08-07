import { ScanFace, Clock } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { FaceRecord } from '@/modules/access-control/types';

export interface FacePreviewCardProps {
  face: FaceRecord;
}

export function FacePreviewCard({ face }: FacePreviewCardProps) {
  const isRegistered = face.status === 'registered';

  return (
    <AppCard className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-(--radius-md) border border-border-default bg-surface-raised text-text-tertiary">
          <ScanFace className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-text-primary">{face.name}</p>
          <p className="truncate text-[11px] text-text-tertiary">{face.employeeId} · {face.group}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge tone={isRegistered ? 'success' : 'warning'}>{isRegistered ? 'Registered' : 'Pending'}</StatusBadge>
        {isRegistered && <span className="text-[11px] text-text-tertiary">Quality {face.templateQuality}%</span>}
      </div>

      <div className="flex items-center justify-between border-t border-border-default pt-2.5 text-[11px] text-text-tertiary">
        <span>Enrolled {face.enrolledOn}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {face.lastMatched}
        </span>
      </div>
    </AppCard>
  );
}
