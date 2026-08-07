import { useState } from 'react';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Volume2, DoorOpen } from 'lucide-react';

import { AppCard, AppCardContent, AppCardHeader, AppCardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { LIVE_CALL_STATUS_TONE, titleCase } from '@/modules/building-intercom/components/shared/statusTone';
import type { LiveCall } from '@/modules/building-intercom/types';

export interface LiveCallPanelProps {
  call: LiveCall;
}

export function LiveCallPanel({ call }: LiveCallPanelProps) {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(call.callType === 'Video');

  return (
    <AppCard>
      <AppCardHeader>
        <AppCardTitle>Active Call — {call.id}</AppCardTitle>
        <StatusBadge tone={LIVE_CALL_STATUS_TONE[call.status]}>{titleCase(call.status)}</StatusBadge>
      </AppCardHeader>
      <AppCardContent className="space-y-4">
        <div className="flex aspect-video w-full items-center justify-center rounded-(--radius-md) border border-border-default bg-surface-raised">
          {videoOn ? (
            <div className="flex flex-col items-center gap-2 text-text-tertiary">
              <Video className="size-8" />
              <span className="text-[12px]">Video feed placeholder — {call.caller}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-text-tertiary">
              <Volume2 className="size-8" />
              <span className="text-[12px]">Audio-only call — {call.caller}</span>
            </div>
          )}
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12.5px] sm:grid-cols-4">
          <div>
            <dt className="text-[11px] text-text-tertiary">Caller</dt>
            <dd className="text-text-primary">{call.caller}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-text-tertiary">Receiver</dt>
            <dd className="text-text-primary">{call.receiver}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-text-tertiary">Duration</dt>
            <dd className="font-mono text-text-primary">{call.duration}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-text-tertiary">Call Type</dt>
            <dd className="text-text-primary">{call.callType}</dd>
          </div>
        </dl>

        <div className="flex items-center gap-2 rounded-(--radius-md) border border-border-default bg-surface-raised px-3 py-2">
          <span className="text-[11px] text-text-tertiary">Connection Quality</span>
          <StatusBadge tone={call.connectionQuality}>
            {call.connectionQuality === 'success' ? 'Excellent' : call.connectionQuality === 'warning' ? 'Fair' : 'Poor'}
          </StatusBadge>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border-default pt-4">
          <Button variant={micOn ? 'secondary' : 'outline'} size="sm" onClick={() => setMicOn((v) => !v)}>
            {micOn ? <Mic className="size-3.5" /> : <MicOff className="size-3.5" />}
            {micOn ? 'Mute' : 'Unmute'}
          </Button>
          <Button variant={videoOn ? 'secondary' : 'outline'} size="sm" onClick={() => setVideoOn((v) => !v)}>
            {videoOn ? <Video className="size-3.5" /> : <VideoOff className="size-3.5" />}
            {videoOn ? 'Stop Video' : 'Start Video'}
          </Button>
          <Button variant="outline" size="sm">
            <DoorOpen className="size-3.5" />
            Unlock Door
          </Button>
          <Button variant="danger" size="sm" className="ml-auto">
            <PhoneOff className="size-3.5" />
            End Call
          </Button>
        </div>
      </AppCardContent>
    </AppCard>
  );
}
