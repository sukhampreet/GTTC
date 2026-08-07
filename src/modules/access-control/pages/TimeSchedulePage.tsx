import { PlusCircle } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { timeScheduleRecords } from '@/modules/access-control/mock';
import { TimeScheduleGrid } from '@/modules/access-control/components/schedule/TimeScheduleGrid';

export function TimeSchedulePage() {
  return (
    <div>
      <PageHeader
        title="Time Schedule"
        description="Define weekly access windows and shift groups used by permissions and door policies."
        actions={
          <Button size="sm">
            <PlusCircle className="size-3.5" />
            New Schedule
          </Button>
        }
      />
      <TimeScheduleGrid schedules={timeScheduleRecords} />
    </div>
  );
}
