import { Camera, CameraOff, Disc, BrainCircuit, HardDrive, Server, Cpu } from 'lucide-react';

import { StatCard } from '@/components/data/StatCard';
import { cameraRecords, nvrRecords, edgeDeviceRecords, recordingStorage } from '@/modules/video-surveillance/mock';

export function OverviewCards() {
  const total = cameraRecords.length;
  const online = cameraRecords.filter((c) => c.status === 'online').length;
  const offline = cameraRecords.filter((c) => c.status === 'offline').length;
  const recording = cameraRecords.filter((c) => c.recording).length;
  const aiEnabled = cameraRecords.filter((c) => c.aiEnabled).length;
  const videoStorage = recordingStorage.find((s) => s.id === 'video-storage');
  const nvrsOnline = nvrRecords.filter((n) => n.status === 'online').length;
  const edgeOnline = edgeDeviceRecords.filter((e) => e.status === 'online').length;

  const cards = [
    { label: 'Total Cameras', value: total, icon: Camera, tone: 'neutral' as const },
    { label: 'Online Cameras', value: online, icon: Camera, tone: 'success' as const, hint: `${((online / total) * 100).toFixed(1)}% availability` },
    { label: 'Offline Cameras', value: offline, icon: CameraOff, tone: 'danger' as const },
    { label: 'Recording Cameras', value: recording, icon: Disc, tone: 'info' as const },
    { label: 'AI Enabled Cameras', value: aiEnabled, icon: BrainCircuit, tone: 'info' as const },
    { label: 'Storage Usage', value: `${videoStorage?.usedPct}%`, icon: HardDrive, tone: 'warning' as const, hint: videoStorage?.used },
    { label: 'NVR Status', value: `${nvrsOnline}/${nvrRecords.length}`, icon: Server, tone: 'success' as const, hint: 'Online' },
    { label: 'Edge Devices', value: `${edgeOnline}/${edgeDeviceRecords.length}`, icon: Cpu, tone: 'success' as const, hint: 'Online' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} tone={card.tone} hint={card.hint} />
      ))}
    </div>
  );
}
