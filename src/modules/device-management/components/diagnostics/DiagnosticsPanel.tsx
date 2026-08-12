import { useState } from 'react';
import { RefreshCw, Radar, Activity } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DataTable, type DataTableColumn } from '@/modules/device-management/components/shared/DataTable';
import { DEVICE_STATUS_TONE, titleCase } from '@/modules/device-management/components/shared/statusTone';
import { diagnostics as diagnosticsData } from '@/modules/device-management/mock/diagnostics';
import type { DiagnosticRecord } from '@/modules/device-management/types';

/**
 * UI-only diagnostics interface. "Ping" / "Refresh" / "Run Diagnostics" are
 * frontend mock actions — no real network commands are executed, per the
 * sprint's no-backend constraint.
 */
export function DiagnosticsPanel() {
  const [runningId, setRunningId] = useState<string | null>(null);
  const [lastRun, setLastRun] = useState<Record<string, string>>({});

  function runDiagnostic(row: DiagnosticRecord) {
    setRunningId(row.id);
    window.setTimeout(() => {
      setRunningId(null);
      setLastRun((prev) => ({ ...prev, [row.id]: 'Just now' }));
    }, 900);
  }

  const columns: DataTableColumn<DiagnosticRecord>[] = [
    { id: 'device', header: 'Device', cell: (r) => <span className="font-medium text-text-primary">{r.device}</span>, sortAccessor: (r) => r.device },
    {
      id: 'status',
      header: 'Connection Status',
      cell: (r) => <StatusBadge tone={DEVICE_STATUS_TONE[r.connectionStatus]}>{titleCase(r.connectionStatus)}</StatusBadge>,
      sortAccessor: (r) => r.connectionStatus,
    },
    { id: 'latency', header: 'Latency', cell: (r) => (r.latencyMs > 0 ? `${r.latencyMs} ms` : '—'), sortAccessor: (r) => r.latencyMs, align: 'right' },
    { id: 'loss', header: 'Packet Loss', cell: (r) => `${r.packetLossPct}%`, sortAccessor: (r) => r.packetLossPct, align: 'right' },
    { id: 'cpu', header: 'CPU', cell: (r) => `${r.cpuPct}%`, sortAccessor: (r) => r.cpuPct, align: 'right' },
    { id: 'mem', header: 'Memory', cell: (r) => `${r.memoryPct}%`, sortAccessor: (r) => r.memoryPct, align: 'right' },
    { id: 'storage', header: 'Storage', cell: (r) => `${r.storagePct}%`, sortAccessor: (r) => r.storagePct, align: 'right' },
    { id: 'lastComm', header: 'Last Communication', cell: (r) => lastRun[r.id] ?? r.lastCommunication },
    {
      id: 'actions',
      header: 'Actions',
      hideable: false,
      cell: (r) => (
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" onClick={() => runDiagnostic(r)} disabled={runningId === r.id}>
            <Radar className={runningId === r.id ? 'size-3.5 animate-spin' : 'size-3.5'} />
            Ping
          </Button>
          <Button variant="outline" size="sm" onClick={() => runDiagnostic(r)} disabled={runningId === r.id}>
            <RefreshCw className="size-3.5" />
            Refresh
          </Button>
          <Button variant="primary" size="sm" onClick={() => runDiagnostic(r)} disabled={runningId === r.id}>
            <Activity className="size-3.5" />
            Run Diagnostics
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={diagnosticsData}
      columns={columns}
      getRowId={(r) => r.id}
      searchableText={(r) => r.device}
      searchPlaceholder="Search devices…"
      pageSize={8}
      emptyTitle="No diagnostic records"
      onExport={() => window.print()}
    />
  );
}
