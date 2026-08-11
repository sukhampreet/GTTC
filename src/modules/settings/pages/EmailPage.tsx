import { useState } from 'react';
import { Send } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { SelectField, TextField } from '@/modules/settings/components/shared/FormField';

export function EmailPage() {
  const [testSent, setTestSent] = useState(false);

  return (
    <div>
      <PageHeader title="Email / SMTP" description="Outbound email configuration for system and alert notifications. UI only — no real credentials are stored or transmitted." />

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>SMTP Configuration</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="SMTP Host" defaultValue="smtp.gttc-security.local" placeholder="smtp.example.com" />
          <TextField label="SMTP Port" defaultValue="587" type="number" />
          <TextField label="Username" defaultValue="alerts@gttc-security.local" />
          <TextField label="Password" type="password" defaultValue="••••••••••••" hint="Masked — never displayed in plain text." />
          <SelectField label="Encryption" options={['STARTTLS', 'SSL/TLS', 'None']} />
          <TextField label="Sender Address" defaultValue="no-reply@gttc-security.local" />
        </AppCardContent>
      </AppCard>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setTestSent(true)}>
          <Send className="size-3.5" />
          Test Connection
        </Button>
        <Button size="sm">Save Changes</Button>
      </div>

      {testSent && (
        <p className="mt-2 text-right text-[11.5px] text-success-400">
          Test connection simulated successfully — no real email was sent.
        </p>
      )}
    </div>
  );
}
