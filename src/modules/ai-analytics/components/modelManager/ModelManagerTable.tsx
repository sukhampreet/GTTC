import { useState } from 'react';
import { Eye, Settings2 } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { AppCard } from '@/components/ui/AppCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { GENERIC_STATUS_TONE, titleCase } from '@/modules/ai-analytics/components/shared/statusTone';
import type { AIModel } from '@/modules/ai-analytics/types';

/**
 * Frontend mock controls only — toggling here updates local component state
 * for demonstration purposes. No real model deployment or backend call is made.
 */
export function ModelManagerTable({ models: initialModels }: { models: AIModel[] }) {
  const [models, setModels] = useState(initialModels);

  function toggleEnabled(id: string) {
    setModels((prev) => prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled, status: m.enabled ? 'stopped' : 'running' } : m)));
  }

  if (models.length === 0) {
    return <EmptyState title="No AI models found" description="No models are registered on this platform." />;
  }

  return (
    <AppCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-border-default bg-surface-raised/60">
              {['Enabled', 'Model Name', 'Model Type', 'Version', 'Status', 'Accuracy', 'Last Updated', 'Deployment Status', 'Actions'].map((h) => (
                <th key={h} className="whitespace-nowrap px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id} className="border-b border-border-default last:border-0 hover:bg-surface-hover/60">
                <td className="px-3.5 py-2.5"><Checkbox checked={model.enabled} onChange={() => toggleEnabled(model.id)} /></td>
                <td className="whitespace-nowrap px-3.5 py-2.5 font-medium text-text-primary">{model.modelName}</td>
                <td className="whitespace-nowrap px-3.5 py-2.5 text-text-secondary">{model.modelType}</td>
                <td className="whitespace-nowrap px-3.5 py-2.5 text-text-secondary">{model.version}</td>
                <td className="whitespace-nowrap px-3.5 py-2.5"><StatusBadge tone={GENERIC_STATUS_TONE[model.status]}>{titleCase(model.status)}</StatusBadge></td>
                <td className="whitespace-nowrap px-3.5 py-2.5 tabular-nums text-text-secondary">{model.accuracy}%</td>
                <td className="whitespace-nowrap px-3.5 py-2.5 text-text-secondary">{model.lastUpdated}</td>
                <td className="whitespace-nowrap px-3.5 py-2.5"><StatusBadge tone={GENERIC_STATUS_TONE[model.deploymentStatus]}>{titleCase(model.deploymentStatus)}</StatusBadge></td>
                <td className="whitespace-nowrap px-3.5 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="sm" title="View Details"><Eye className="size-3.5" /></Button>
                    <Button variant="outline" size="sm" title="Configure"><Settings2 className="size-3.5" /></Button>
                    <Button variant={model.enabled ? 'danger' : 'primary'} size="sm" onClick={() => toggleEnabled(model.id)}>
                      {model.enabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppCard>
  );
}
