import { ListTree, ShieldAlert, TriangleAlert, AlertOctagon, Info, BellRing, CalendarClock, CalendarDays } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { events } from '@/modules/event-center/mock/events';

function isToday(timestamp: string) {
  return timestamp.startsWith('2026-08-11');
}

export function OverviewCards() {
  const total = events.length;
  const critical = events.filter((e) => e.severity === 'critical').length;
  const high = events.filter((e) => e.severity === 'high').length;
  const warnings = events.filter((e) => e.severity === 'warning').length;
  const info = events.filter((e) => e.severity === 'info').length;
  const unacknowledged = events.filter((e) => !e.acknowledged).length;
  const today = events.filter((e) => isToday(e.timestamp)).length;
  const thisWeek = events.length;

  const cards = [
    { label: 'Total Events', value: total, icon: ListTree, tone: 'neutral' as const },
    { label: 'Critical Events', value: critical, icon: ShieldAlert, tone: critical > 0 ? ('danger' as const) : ('success' as const) },
    { label: 'High Priority', value: high, icon: AlertOctagon, tone: high > 0 ? ('danger' as const) : ('success' as const) },
    { label: 'Warnings', value: warnings, icon: TriangleAlert, tone: 'warning' as const },
    { label: 'Information', value: info, icon: Info, tone: 'info' as const },
    { label: 'Unacknowledged', value: unacknowledged, icon: BellRing, tone: unacknowledged > 0 ? ('warning' as const) : ('success' as const) },
    { label: 'Events Today', value: today, icon: CalendarClock, tone: 'neutral' as const },
    { label: 'Events This Week', value: thisWeek, icon: CalendarDays, tone: 'neutral' as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} />
      ))}
    </div>
  );
}
