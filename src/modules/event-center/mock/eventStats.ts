import { events } from '@/modules/event-center/mock/events';
import type {
  AcknowledgementRatePoint,
  EventStatsByModule,
  EventStatsBySeverity,
  EventTrendPoint,
  SourceModule,
} from '@/modules/event-center/types';

const MODULE_COLORS: Record<SourceModule, string> = {
  'Video Surveillance': 'var(--color-primary-500)',
  'Access Control': 'var(--color-accent-500)',
  'Building Intercom': 'var(--color-info-500)',
  'Fire & Emergency': 'var(--color-danger-500)',
  'Smart Parking': 'var(--color-warning-500)',
  'Environment Monitoring': 'var(--color-success-500)',
  'AI Analytics': 'var(--color-secondary-500)',
  'Cyber Security': 'var(--color-danger-600)',
  'Device Management': 'var(--color-primary-300)',
};

const SEVERITY_COLORS = {
  critical: 'var(--color-danger-500)',
  high: 'var(--color-danger-400)',
  warning: 'var(--color-warning-500)',
  info: 'var(--color-info-500)',
} as const;

export const eventsByModule: EventStatsByModule[] = (Object.keys(MODULE_COLORS) as SourceModule[])
  .map((module) => ({
    module,
    value: events.filter((e) => e.sourceModule === module).length,
    color: MODULE_COLORS[module],
  }))
  .filter((entry) => entry.value > 0)
  .sort((a, b) => b.value - a.value);

export const eventsBySeverity: EventStatsBySeverity[] = (['critical', 'high', 'warning', 'info'] as const).map(
  (severity) => ({
    severity,
    value: events.filter((e) => e.severity === severity).length,
    color: SEVERITY_COLORS[severity],
  }),
);

export const eventTrend: EventTrendPoint[] = [
  { day: 'Mon', critical: 3, warning: 8, info: 22 },
  { day: 'Tue', critical: 5, warning: 11, info: 19 },
  { day: 'Wed', critical: 2, warning: 6, info: 24 },
  { day: 'Thu', critical: 6, warning: 9, info: 21 },
  { day: 'Fri', critical: 4, warning: 13, info: 26 },
  { day: 'Sat', critical: 1, warning: 5, info: 15 },
  { day: 'Sun', critical: 7, warning: 10, info: 18 },
];

export const acknowledgementRate: AcknowledgementRatePoint[] = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 88 },
  { day: 'Wed', rate: 95 },
  { day: 'Thu', rate: 90 },
  { day: 'Fri', rate: 86 },
  { day: 'Sat', rate: 97 },
  { day: 'Sun', rate: 91 },
];

export const eventsByType: { type: string; value: number }[] = Object.entries(
  events.reduce<Record<string, number>>((acc, e) => {
    acc[e.eventType] = (acc[e.eventType] ?? 0) + 1;
    return acc;
  }, {}),
)
  .map(([type, value]) => ({ type, value }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 8);
