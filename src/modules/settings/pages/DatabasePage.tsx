import { Database } from 'lucide-react';

import { PageHeader } from '@/components/ui/PageHeader';
import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatCard } from '@/components/data/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { databaseStatusSummary, databaseTableStats } from '@/modules/settings/mock';

export function DatabasePage() {
  const s = databaseStatusSummary;

  return (
    <div>
      <PageHeader title="Database Status" description={`${s.engine} — connection, storage and query health overview.`} />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Database Status" value={s.connectionStatus} icon={Database} tone="success" />
        <StatCard label="Database Size" value={s.size} icon={Database} tone="neutral" />
        <StatCard label="Active Connections" value={`${s.activeConnections} / ${s.maxConnections}`} icon={Database} tone="info" />
        <StatCard label="Query Health" value={`${s.queryHealthMs} ms`} icon={Database} tone="success" hint="Average query time" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Storage</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="text-text-secondary">Storage Used</span>
                <span className="font-medium text-text-primary">{s.storageUsedPct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hover">
                <div className="h-full rounded-full bg-primary-500" style={{ width: `${s.storageUsedPct}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1 text-[12.5px]">
              <div>
                <p className="text-text-tertiary">Tables</p>
                <p className="font-medium text-text-primary">{s.tableCount}</p>
              </div>
              <div>
                <p className="text-text-tertiary">Last Backup</p>
                <p className="font-medium text-text-primary">{s.lastBackup}</p>
              </div>
            </div>
          </AppCardContent>
        </AppCard>

        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Connection</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="space-y-2.5">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-text-secondary">Status</span>
              <StatusBadge tone="success">{s.status === 'online' ? 'Online' : s.status}</StatusBadge>
            </div>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-text-secondary">Engine</span>
              <span className="font-medium text-text-primary">{s.engine}</span>
            </div>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-text-secondary">Connection Pool</span>
              <span className="font-medium text-text-primary">{s.activeConnections} active / {s.maxConnections} max</span>
            </div>
          </AppCardContent>
        </AppCard>
      </div>

      <div className="mt-4">
        <AppCard>
          <AppCardHeader>
            <AppCardTitle>Table Overview</AppCardTitle>
          </AppCardHeader>
          <AppCardContent className="p-0">
            <ul className="divide-y divide-border-default">
              {databaseTableStats.map((t) => (
                <li key={t.id} className="flex items-center justify-between px-4 py-2.5">
                  <span className="font-mono text-[12.5px] text-text-primary">{t.name}</span>
                  <span className="text-[11.5px] text-text-tertiary">{t.rows.toLocaleString()} rows · {t.size}</span>
                </li>
              ))}
            </ul>
          </AppCardContent>
        </AppCard>
      </div>
    </div>
  );
}
