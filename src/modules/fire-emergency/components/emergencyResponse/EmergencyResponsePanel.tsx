import { useState } from 'react';
import { Check, MapPin, MessageSquare, Users, Video } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { StatusTone } from '@/types/common';
import type {
  EmergencyChecklistItem,
  EmergencyLevel,
  EmergencyTimelineStep,
} from '@/modules/fire-emergency/types';

export interface EmergencyResponsePanelProps {
  level: EmergencyLevel;
  team: { name: string; role: string; status: string }[];
  nearestExit: string;
  nearestCamera: string;
  assemblyPoint: string;
  timeline: EmergencyTimelineStep[];
  checklist: EmergencyChecklistItem[];
}

const LEVEL_TONE: Record<EmergencyLevel, StatusTone> = {
  normal: 'success',
  elevated: 'warning',
  critical: 'danger',
};

const LEVEL_LABEL: Record<EmergencyLevel, string> = {
  normal: 'Normal',
  elevated: 'Elevated',
  critical: 'Critical',
};

export function EmergencyResponsePanel({
  level,
  team,
  nearestExit,
  nearestCamera,
  assemblyPoint,
  timeline,
  checklist,
}: EmergencyResponsePanelProps) {
  const [items, setItems] = useState(checklist);
  const [message, setMessage] = useState('');

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Emergency Level</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-3">
          <StatusBadge tone={LEVEL_TONE[level]}>{LEVEL_LABEL[level]}</StatusBadge>
          <div className="space-y-2 text-[12.5px] text-text-secondary">
            <p className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-text-tertiary" />
              Nearest Exit: {nearestExit}
            </p>
            <p className="inline-flex items-center gap-1.5">
              <Video className="size-3.5 text-text-tertiary" />
              Nearest Camera: {nearestCamera}
            </p>
            <p className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-text-tertiary" />
              Assembly Point: {assemblyPoint}
            </p>
          </div>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Response Team</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ul className="divide-y divide-border-default">
            {team.map((member) => (
              <li key={member.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <Users className="size-4 text-text-tertiary" />
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-text-primary">{member.name}</p>
                    <p className="truncate text-[11px] text-text-tertiary">{member.role}</p>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] text-text-tertiary">{member.status}</span>
              </li>
            ))}
          </ul>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Communication Panel</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-2.5">
          <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Send an update to the response team…" />
          <Button size="sm" className="w-full" disabled={!message.trim()} onClick={() => setMessage('')}>
            <MessageSquare className="size-3.5" />
            Send Update
          </Button>
        </AppCardContent>
      </AppCard>

      <AppCard className="xl:col-span-2">
        <AppCardHeader>
          <AppCardTitle>Incident Timeline</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-0">
          <ol className="divide-y divide-border-default">
            {timeline.map((step) => (
              <li key={step.id} className="flex items-start gap-3 px-4 py-2.5">
                <span
                  className={
                    step.done
                      ? 'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-success-500 text-white'
                      : 'mt-0.5 size-4 shrink-0 rounded-full border-2 border-border-strong'
                  }
                >
                  {step.done && <Check className="size-2.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] text-text-tertiary">{step.time}</p>
                  <p className="text-[13px] text-text-primary">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </AppCardContent>
      </AppCard>

      <AppCard>
        <AppCardHeader>
          <AppCardTitle>Checklist</AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="space-y-2">
          {items.map((item) => (
            <label key={item.id} className="flex items-start gap-2 text-[12.5px] text-text-secondary">
              <Checkbox
                checked={item.done}
                onChange={() =>
                  setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, done: !i.done } : i)))
                }
              />
              <span className={item.done ? 'text-text-tertiary line-through' : ''}>{item.label}</span>
            </label>
          ))}
        </AppCardContent>
      </AppCard>

      <AppCard className="xl:col-span-3">
        <AppCardHeader>
          <AppCardTitle>Campus Map</AppCardTitle>
        </AppCardHeader>
        <AppCardContent>
          <div className="flex h-48 items-center justify-center rounded-(--radius-md) border border-dashed border-border-default bg-surface-raised text-[12.5px] text-text-tertiary">
            Map placeholder — nearest exit, camera and assembly point would be highlighted here.
          </div>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
