import { ShieldCheck, ShieldAlert, Repeat } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/data/StatCard';
import { antiPassbackZones, antiPassbackEvents } from '@/modules/access-control/mock';
import { AntiPassbackPanel } from '@/modules/access-control/components/antiPassback/AntiPassbackPanel';

export function AntiPassbackPage() {
  const enabledZones = antiPassbackZones.filter((z) => z.enabled).length;
  const violationsToday = antiPassbackZones.reduce((sum, z) => sum + z.violationsToday, 0);

  return (
    <div>
      <PageHeader
        title="Anti Passback"
        description="Prevent shared or re-used credentials from bypassing entry/exit sequencing within zones."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Total Zones" value={antiPassbackZones.length} icon={Repeat} tone="neutral" />
        <StatCard label="Enabled Zones" value={enabledZones} icon={ShieldCheck} tone="success" />
        <StatCard label="Violations Today" value={violationsToday} icon={ShieldAlert} tone="warning" />
      </div>

      <AntiPassbackPanel zones={antiPassbackZones} events={antiPassbackEvents} />
    </div>
  );
}
