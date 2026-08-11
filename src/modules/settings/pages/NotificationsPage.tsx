import { useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { notificationCategories } from '@/modules/settings/mock';
import type { NotificationCategorySetting } from '@/modules/settings/types';

const CHANNELS: { key: keyof Pick<NotificationCategorySetting, 'email' | 'sms' | 'push'>; label: string }[] = [
  { key: 'email', label: 'Email' },
  { key: 'sms', label: 'SMS' },
  { key: 'push', label: 'Push' },
];

export function NotificationsPage() {
  const [categories, setCategories] = useState(notificationCategories);

  function toggle(id: string, channel: 'email' | 'sms' | 'push') {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, [channel]: !c[channel] } : c)));
  }

  return (
    <div>
      <PageHeader title="Notifications" description="Configure which channels deliver each alert category platform-wide." />

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Notification Preferences</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="overflow-x-auto p-0">
          <table className="w-full border-collapse text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-border-default bg-surface-raised/60">
                <th className="whitespace-nowrap px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Category</th>
                {CHANNELS.map((c) => (
                  <th key={c.key} className="whitespace-nowrap px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-border-default last:border-0 hover:bg-surface-hover/60">
                  <td className="whitespace-nowrap px-4 py-2.5 font-medium text-text-primary">{cat.label}</td>
                  {CHANNELS.map((c) => (
                    <td key={c.key} className="px-4 py-2.5 text-center">
                      <Checkbox checked={cat[c.key]} onChange={() => toggle(cat.id, c.key)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </AppCardContent>
      </AppCard>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm">Reset</Button>
        <Button size="sm">Save Preferences</Button>
      </div>
    </div>
  );
}
