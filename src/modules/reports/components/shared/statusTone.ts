import type { StatusTone } from '@/types/common';
import type { IncidentSeverity, ReportHistoryEntry } from '@/modules/reports/types';

export const SEVERITY_TONE: Record<IncidentSeverity, StatusTone> = {
  critical: 'danger',
  high: 'warning',
  medium: 'info',
  low: 'neutral',
};

export const INCIDENT_STATUS_TONE: Record<string, StatusTone> = {
  open: 'danger',
  'in-progress': 'warning',
  resolved: 'success',
};

export const REPORT_STATUS_TONE: Record<ReportHistoryEntry['status'], StatusTone> = {
  ready: 'success',
  generating: 'warning',
  failed: 'danger',
};

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
