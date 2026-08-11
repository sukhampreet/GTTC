import { PageHeader } from '@/components/ui/PageHeader';
import { alarmHistory } from '@/modules/fire-emergency/mock';
import { AlarmHistoryTable } from '@/modules/fire-emergency/components/alarmHistory/AlarmHistoryTable';

export function AlarmHistoryPage() {
  return (
    <div>
      <PageHeader title="Alarm History" description="Complete chronological record of every fire and emergency alarm event." />
      <AlarmHistoryTable entries={alarmHistory} />
    </div>
  );
}
