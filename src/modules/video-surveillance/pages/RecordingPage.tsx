import { PageHeader } from '@/components/ui/PageHeader';
import { RecordingOverview } from '@/modules/video-surveillance/components/recording/RecordingOverview';

export function RecordingPage() {
  return (
    <div>
      <PageHeader
        title="Recording"
        description="Storage utilisation, retention policy and archive status across the recording fleet. Mock data only."
      />
      <RecordingOverview />
    </div>
  );
}
