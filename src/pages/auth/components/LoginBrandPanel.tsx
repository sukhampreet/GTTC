import { ShieldCheck, Activity, Brain, Lock, Radio } from 'lucide-react';

import { NetworkTopologyBackdrop } from '@/pages/auth/components/NetworkTopologyBackdrop';
import { SystemStatusGrid } from '@/pages/auth/components/SystemStatusGrid';

const CAPABILITIES = [
  { icon: Activity, label: 'Real-time Monitoring' },
  { icon: ShieldCheck, label: 'Integrated Security' },
  { icon: Brain, label: 'AI Analytics' },
  { icon: Lock, label: 'Cyber Security' },
  { icon: Radio, label: 'Command Center' },
];

export function LoginBrandPanel() {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-[#0a0d13] px-12 py-10 text-white lg:flex">
      <NetworkTopologyBackdrop />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(47,125,225,0.16), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(23,184,203,0.10), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-(--radius-md) border border-primary-500/40 bg-primary-500/10">
          <ShieldCheck className="size-5 text-primary-400" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">GTTC</p>
          <p className="text-[10px] uppercase tracking-widest text-white/45">Central Control Platform</p>
        </div>
      </div>

      <div className="relative z-10 max-w-lg">
        <h1 className="text-[28px] font-semibold leading-tight text-white">
          Indigenous Smart Security
          <br />
          Central Control Platform
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Unified command and control for video surveillance, access control, fire &amp; emergency,
          smart parking, and environment monitoring across your entire facility.
        </p>

        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
          {CAPABILITIES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-white/70">
              <Icon className="size-3.5 text-primary-400" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          Live System Status
        </p>
        <SystemStatusGrid />
      </div>
    </div>
  );
}
