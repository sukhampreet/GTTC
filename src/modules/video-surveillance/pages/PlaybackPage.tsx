import { useMemo, useState } from 'react';

import { PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/data/FilterBar';
import { SearchBar } from '@/components/data/SearchBar';
import { cameraRecords, recordingEntries } from '@/modules/video-surveillance/mock';
import { PlaybackTimeline } from '@/modules/video-surveillance/components/playback/PlaybackTimeline';
import { PlaybackControls } from '@/modules/video-surveillance/components/playback/PlaybackControls';
import { PlaybackCalendar } from '@/modules/video-surveillance/components/playback/PlaybackCalendar';
import { RecordingListPanel } from '@/modules/video-surveillance/components/playback/RecordingListPanel';
import { CameraTile } from '@/modules/video-surveillance/components/liveView/CameraTile';

const SEGMENTS: { startHour: number; endHour: number; type: 'continuous' | 'motion' | 'ai-event' }[] = [
  { startHour: 0, endHour: 6, type: 'continuous' },
  { startHour: 6, endHour: 9, type: 'motion' },
  { startHour: 9, endHour: 9.5, type: 'ai-event' },
  { startHour: 9.5, endHour: 18, type: 'continuous' },
  { startHour: 18, endHour: 21, type: 'motion' },
  { startHour: 21, endHour: 21.5, type: 'ai-event' },
  { startHour: 21.5, endHour: 24, type: 'continuous' },
];

export function PlaybackPage() {
  const [selectedDay, setSelectedDay] = useState(7);
  const [selectedCameraId, setSelectedCameraId] = useState(cameraRecords[0]?.id ?? '');
  const [query, setQuery] = useState('');

  const selectedCamera = cameraRecords.find((c) => c.id === selectedCameraId) ?? cameraRecords[0];

  const filteredRecordings = useMemo(() => {
    return recordingEntries.filter((r) => {
      const matchesQuery = !query.trim() || r.camera.toLowerCase().includes(query.trim().toLowerCase());
      return matchesQuery;
    });
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Playback"
        description="Search and review recorded footage across cameras. Mock recordings only — no streaming backend."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {selectedCamera && (
            <div className="aspect-video w-full overflow-hidden rounded-(--radius-lg) border border-border-default">
              <CameraTile camera={selectedCamera} />
            </div>
          )}
          <PlaybackTimeline activeHour={9.7} segments={SEGMENTS} />
          <PlaybackControls />
        </div>

        <div className="space-y-3">
          <PlaybackCalendar selectedDay={selectedDay} onSelectDay={setSelectedDay} />

          <FilterBar>
            <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by camera…" containerClassName="w-full" />
          </FilterBar>

          <div className="flex flex-wrap gap-1.5 rounded-(--radius-md) border border-border-default bg-surface p-2">
            {cameraRecords.slice(0, 8).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCameraId(c.id)}
                className={`rounded-(--radius-sm) px-2 py-1 text-[11px] font-medium transition-colors ${
                  selectedCameraId === c.id
                    ? 'bg-primary-500/15 text-primary-300'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <RecordingListPanel recordings={filteredRecordings} />
      </div>
    </div>
  );
}
