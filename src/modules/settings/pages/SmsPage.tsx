import { useState } from 'react';
import { Send } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { SelectField, TextField, ToggleField } from '@/modules/settings/components/shared/FormField';
import { notificationCategories } from '@/modules/settings/mock';

export function SmsPage() {
  const [testSent, setTestSent] = useState(false);

  return (
    <div>
      <PageHeader title="SMS" description="SMS gateway configuration for critical alert delivery. Frontend representation only." />

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Gateway Configuration</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField label="Provider" options={['Twilio', 'MSG91', 'AWS SNS', 'Custom Gateway']} />
          <TextField label="API Endpoint" defaultValue="https://api.sms-provider.example/v1/send" placeholder="https://…" />
          <TextField label="Sender ID" defaultValue="GTTCSEC" />
          <TextField label="API Key" type="password" defaultValue="••••••••••••••••" hint="Masked — never displayed in plain text." />
        </AppCardContent>
      </AppCard>

      <div className="mt-4">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Notification Categories via SMS</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {notificationCategories.map((c) => (
              <ToggleField key={c.id} label={c.label} defaultChecked={c.sms} />
            ))}
          </AppCardContent>
        </AppCard>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setTestSent(true)}>
          <Send className="size-3.5" />
          Send Test SMS
        </Button>
        <Button size="sm">Save Changes</Button>
      </div>

      {testSent && (
        <p className="mt-2 text-right text-[11.5px] text-success-400">Test SMS simulated successfully — no real message was sent.</p>
      )}
    </div>
  );
}
