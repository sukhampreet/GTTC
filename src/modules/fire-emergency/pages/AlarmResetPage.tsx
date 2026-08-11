import { PageHeader } from '@/components/ui/PageHeader';
import { alarmResetQueue } from '@/modules/fire-emergency/mock';
import { AlarmResetPanel } from '@/modules/fire-emergency/components/alarmReset/AlarmResetPanel';

export function AlarmResetPage() {
  return (
    <div>
      <PageHeader title="Alarm Reset" description="Review and reset active fire alarms. Every reset is logged with operator and timestamp." />
      <AlarmResetPanel items={alarmResetQueue} operatorName="Current Operator" />
    </div>
  );
}
