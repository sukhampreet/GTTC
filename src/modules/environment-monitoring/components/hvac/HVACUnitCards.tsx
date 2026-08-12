import { useState } from 'react';
import { Fan, Snowflake, Flame, RotateCw, Power } from 'lucide-react';

import { AppCard } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmationDialog } from '@/components/ui/Dialog';
import { HVAC_MODE_TONE, DEVICE_STATUS_LABEL, DEVICE_STATUS_TONE, titleCase } from '@/modules/environment-monitoring/components/shared/statusTone';
import type { HVACMode, HVACUnit } from '@/modules/environment-monitoring/types';

export interface HVACUnitCardsProps {
  units: HVACUnit[];
}

const MODE_OPTIONS: { mode: HVACMode; label: string; icon: typeof Snowflake }[] = [
  { mode: 'cooling', label: 'Cool', icon: Snowflake },
  { mode: 'heating', label: 'Heat', icon: Flame },
  { mode: 'auto', label: 'Auto', icon: RotateCw },
  { mode: 'off', label: 'Off', icon: Power },
];

function HVACUnitCard({ unit }: { unit: HVACUnit }) {
  const [mode, setMode] = useState<HVACMode>(unit.mode);
  const [running, setRunning] = useState(unit.running);
  const [confirmOff, setConfirmOff] = useState(false);

  function handleModeSelect(next: HVACMode) {
    if (next === 'off') {
      setConfirmOff(true);
      return;
    }
    setMode(next);
    setRunning(true);
  }

  return (
    <AppCard className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-(--radius-md) border border-border-default bg-surface-raised text-info-400">
            <Fan className="size-4.5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-text-primary">{unit.unitName}</p>
            <p className="truncate text-[11px] text-text-tertiary">{unit.zone}</p>
          </div>
        </div>
        <StatusBadge tone={DEVICE_STATUS_TONE[unit.health]}>{DEVICE_STATUS_LABEL[unit.health]}</StatusBadge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-2">
          <p className="text-[10.5px] text-text-tertiary">Setpoint</p>
          <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-text-primary">{unit.setpointC}°C</p>
        </div>
        <div className="rounded-(--radius-md) border border-border-default bg-surface-raised px-2.5 py-2">
          <p className="text-[10.5px] text-text-tertiary">Current</p>
          <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-text-primary">{running ? unit.currentTempC.toFixed(1) : '—'}°C</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge tone={HVAC_MODE_TONE[running ? mode : 'off']}>{titleCase(running ? mode : 'off')}</StatusBadge>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {MODE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const active = option.mode === 'off' ? !running : running && mode === option.mode;
          return (
            <Button
              key={option.mode}
              variant={active ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => handleModeSelect(option.mode)}
              disabled={active}
            >
              <Icon className="size-3.5" />
              {option.label}
            </Button>
          );
        })}
      </div>

      <ConfirmationDialog
        open={confirmOff}
        title="Confirm Switch to Off"
        description={`This will power down "${unit.unitName}" and stop conditioning for ${unit.zone}.`}
        confirmLabel="Switch Off"
        tone="danger"
        onConfirm={() => {
          setMode('off');
          setRunning(false);
          setConfirmOff(false);
        }}
        onCancel={() => setConfirmOff(false)}
      />
    </AppCard>
  );
}

export function HVACUnitCards({ units }: HVACUnitCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {units.map((unit) => (
        <HVACUnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
