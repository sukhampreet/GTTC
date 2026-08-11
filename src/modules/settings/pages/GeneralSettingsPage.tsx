import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { SelectField, TextField, ToggleField } from '@/modules/settings/components/shared/FormField';

export function GeneralSettingsPage() {
  return (
    <div>
      <PageHeader title="General Settings" description="Core platform identity and session behaviour." />

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Platform Identity</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="System Name" defaultValue="GTTC Indigenous Smart Security Platform" />
          <TextField label="Organization Name" defaultValue="GTTC Security Operations" />
          <TextField label="Site Name" defaultValue="Main Campus" />
          <SelectField label="Timezone" options={['Asia/Kolkata (IST, UTC+5:30)', 'UTC', 'Asia/Dubai (UTC+4:00)', 'Asia/Singapore (UTC+8:00)']} />
          <SelectField label="Language" options={['English', 'Hindi', 'Kannada']} />
          <SelectField label="Date Format" options={['DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD']} />
          <SelectField label="Time Format" options={['24-hour', '12-hour (AM/PM)']} />
          <SelectField label="Default Landing Page" options={['Dashboard', 'Video Surveillance', 'Access Control', 'Live Monitoring']} />
        </AppCardContent>
      </AppCard>

      <div className="mt-4">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Session Behaviour</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Session Timeout (minutes)" defaultValue="30" type="number" />
            <TextField label="Auto Logout After Inactivity (minutes)" defaultValue="15" type="number" />
            <ToggleField label="Enforce Auto Logout" defaultChecked hint="Automatically sign out inactive sessions" />
            <ToggleField label="Require MFA for Administrators" defaultChecked />
          </AppCardContent>
        </AppCard>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm">Reset</Button>
        <Button size="sm">Save Changes</Button>
      </div>
    </div>
  );
}
