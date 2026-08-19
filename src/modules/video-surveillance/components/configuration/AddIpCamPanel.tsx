import { useState, type FormEvent } from 'react';
import { Loader2, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';
import {
  MAX_CHANNEL,
  MIN_CHANNEL,
  useAddCameraMutation,
  useCameraRegistry,
  useRemoveCameraMutation,
} from '@/modules/video-surveillance/hooks/useCameraRegistry';
import { FormField } from '@/modules/video-surveillance/components/configuration/FormField';

const ALL_CHANNELS = Array.from({ length: MAX_CHANNEL - MIN_CHANNEL + 1 }, (_, i) => i + MIN_CHANNEL);

const SELECT_CLASS =
  'h-9 w-full rounded-(--radius-md) border border-border-default bg-surface px-3 text-[13px] text-text-primary outline-none focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50';

const STATUS_LABEL: Record<string, string> = {
  online: 'Connected',
  starting: 'Starting…',
  error: 'Error',
  offline: 'Registered · Idle',
};

const STATUS_TONE_CLASS: Record<string, string> = {
  online: 'text-success-400',
  starting: 'text-warning-400',
  error: 'text-danger-400',
  offline: 'text-warning-400',
};

interface FormState {
  channel: string;
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  streamType: 'main' | 'sub';
}

const EMPTY_FORM: FormState = {
  channel: '',
  name: '',
  host: '',
  port: '554',
  username: '',
  password: '',
  streamType: 'main',
};

export function AddIpCamPanel() {
  const { backendCameras, availableChannels, isLoading } = useCameraRegistry();
  const addMutation = useAddCameraMutation();
  const removeMutation = useRemoveCameraMutation();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const channelOptions = availableChannels.map(String);
  const selectedChannel = channelOptions.includes(form.channel) ? form.channel : (channelOptions[0] ?? '');

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedChannel || !form.name.trim() || !form.host.trim()) return;

    await addMutation.mutateAsync({
      name: form.name.trim(),
      channel: Number(selectedChannel),
      host: form.host.trim(),
      port: Number(form.port) || 554,
      username: form.username,
      password: form.password,
      streamType: form.streamType,
    });
    setForm(EMPTY_FORM);
  }

  const byChannel = new Map(backendCameras.map((c) => [c.channel, c]));

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-(--radius-md) border border-border-default bg-surface-raised/40 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Register a New IP Camera</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Channel" hint={channelOptions.length === 0 ? 'All channels are registered' : undefined}>
            <select
              value={selectedChannel}
              onChange={(e) => updateField('channel', e.target.value)}
              disabled={channelOptions.length === 0}
              className={SELECT_CLASS}
            >
              {channelOptions.length === 0 ? (
                <option value="">—</option>
              ) : (
                channelOptions.map((ch) => (
                  <option key={ch} value={ch}>
                    D{ch}
                  </option>
                ))
              )}
            </select>
          </FormField>

          <FormField label="Camera Name">
            <Input value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="e.g. front" required />
          </FormField>

          <FormField label="IP Address / Host">
            <Input value={form.host} onChange={(e) => updateField('host', e.target.value)} placeholder="192.168.1.245" required />
          </FormField>

          <FormField label="Port">
            <Input
              type="number"
              min={1}
              max={65535}
              value={form.port}
              onChange={(e) => updateField('port', e.target.value)}
              placeholder="554"
            />
          </FormField>

          <FormField label="Username">
            <Input value={form.username} onChange={(e) => updateField('username', e.target.value)} autoComplete="off" />
          </FormField>

          <FormField label="Password">
            <Input
              type="password"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              autoComplete="new-password"
            />
          </FormField>

          <FormField label="Stream Type">
            <select
              value={form.streamType}
              onChange={(e) => updateField('streamType', e.target.value as 'main' | 'sub')}
              className={SELECT_CLASS}
            >
              <option value="main">Main</option>
              <option value="sub">Sub</option>
            </select>
          </FormField>
        </div>

        {addMutation.isError && (
          <p className="text-[12px] text-danger-400">
            {addMutation.error instanceof Error ? addMutation.error.message : 'Failed to add camera.'}
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={addMutation.isPending || channelOptions.length === 0}>
            {addMutation.isPending && <Loader2 className="size-3.5 animate-spin" />}
            Add Camera
          </Button>
        </div>
      </form>

      {removeMutation.isError && (
        <p className="text-[12px] text-danger-400">
          {removeMutation.error instanceof Error ? removeMutation.error.message : 'Failed to remove camera.'}
        </p>
      )}

      <div className="overflow-x-auto rounded-(--radius-md) border border-border-default">
        <table className="w-full border-collapse text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-border-default bg-surface-raised/60">
              <th className="px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Channel</th>
              <th className="px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Camera Name</th>
              <th className="px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">IP Address</th>
              <th className="px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Port</th>
              <th className="px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">Status</th>
              <th className="px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary" />
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-3.5 py-4 text-center text-text-tertiary">
                  <Loader2 className="mx-auto size-4 animate-spin" />
                </td>
              </tr>
            )}
            {!isLoading &&
              ALL_CHANNELS.map((ch) => {
                const backend = byChannel.get(ch);
                const removing = removeMutation.isPending && removeMutation.variables === backend?.id;
                return (
                  <tr key={ch} className="border-b border-border-default last:border-0">
                    <td className="px-3.5 py-2.5 text-text-secondary">D{ch}</td>
                    <td className="px-3.5 py-2.5 text-text-secondary">{backend ? backend.name : '—'}</td>
                    <td className="px-3.5 py-2.5 text-text-secondary">{backend ? 'Managed by backend' : '—'}</td>
                    <td className="px-3.5 py-2.5 text-text-secondary">{backend ? 'Managed by backend' : '—'}</td>
                    <td className="px-3.5 py-2.5">
                      <span className={cn('text-[11.5px] font-medium', backend ? STATUS_TONE_CLASS[backend.status] : 'text-text-tertiary')}>
                        {backend ? STATUS_LABEL[backend.status] : 'Not Connected'}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 text-right">
                      {backend && (
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          disabled={removing}
                          onClick={() => removeMutation.mutate(backend.id)}
                        >
                          {removing ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                          Remove
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
