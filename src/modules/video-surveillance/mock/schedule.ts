import type { ScheduleBlock, ScheduleProfile, WeekDay } from '@/modules/video-surveillance/types';

const WEEKDAYS: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function continuousWeek(): ScheduleBlock[] {
  return WEEKDAYS.map((day) => ({ day, startHour: 0, endHour: 24, mode: 'continuous' as const }));
}

function officeHoursWeek(): ScheduleBlock[] {
  return WEEKDAYS.flatMap((day): ScheduleBlock[] => {
    if (day === 'Sat' || day === 'Sun') {
      return [{ day, startHour: 0, endHour: 24, mode: 'motion' as const }];
    }
    return [
      { day, startHour: 0, endHour: 8, mode: 'motion' as const },
      { day, startHour: 8, endHour: 20, mode: 'continuous' as const },
      { day, startHour: 20, endHour: 24, mode: 'motion' as const },
    ];
  });
}

function aiTriggeredWeek(): ScheduleBlock[] {
  return WEEKDAYS.map((day) => ({ day, startHour: 0, endHour: 24, mode: 'ai-triggered' as const }));
}

export const scheduleProfiles: ScheduleProfile[] = [
  { id: 'SCH-01', name: 'Perimeter — 24×7 Continuous', appliedCameras: 6, blocks: continuousWeek() },
  { id: 'SCH-02', name: 'Admin Block — Office Hours', appliedCameras: 6, blocks: officeHoursWeek() },
  { id: 'SCH-03', name: 'AI-Triggered Zones', appliedCameras: 9, blocks: aiTriggeredWeek() },
];
