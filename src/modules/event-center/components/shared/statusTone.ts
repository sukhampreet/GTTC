import type { StatusTone } from '@/types/common';
import { EVENT_SEVERITY_TONE, EVENT_STATUS_TONE } from '@/modules/event-center/types';

export { EVENT_SEVERITY_TONE, EVENT_STATUS_TONE };

export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const SEVERITY_LABEL: Record<string, string> = {
  critical: 'Critical',
  high: 'High',
  warning: 'Warning',
  info: 'Info',
};

export function toneForBoolean(value: boolean): StatusTone {
  return value ? 'success' : 'neutral';
}
