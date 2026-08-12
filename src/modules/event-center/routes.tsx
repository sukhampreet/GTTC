import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { EventCenterLayout } from '@/modules/event-center/layout/EventCenterLayout';
import { EVENT_CENTER_PATHS } from '@/modules/event-center/constants/paths';

import { EventCenterHomePage } from '@/modules/event-center/pages/EventCenterHomePage';
import { CriticalEventsPage } from '@/modules/event-center/pages/CriticalEventsPage';
import { WarningsPage } from '@/modules/event-center/pages/WarningsPage';
import { InformationPage } from '@/modules/event-center/pages/InformationPage';
import { EventTimelinePage } from '@/modules/event-center/pages/EventTimelinePage';
import { EventSearchPage } from '@/modules/event-center/pages/EventSearchPage';
import { EventDetailsPage } from '@/modules/event-center/pages/EventDetailsPage';
import { EventReplayPage } from '@/modules/event-center/pages/EventReplayPage';
import { EventExportPage } from '@/modules/event-center/pages/EventExportPage';
import { EventStatisticsPage } from '@/modules/event-center/pages/EventStatisticsPage';

/**
 * Sprint 9 — Event Center module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>; this is the only
 * "minimal registration" touch point required in the shared routing file.
 */
export const eventCenterRoutes = (
  <Route key="event-center" path={ROUTES.eventCenter} element={<EventCenterLayout />}>
    <Route index element={<EventCenterHomePage />} />
    <Route path={EVENT_CENTER_PATHS.critical} element={<CriticalEventsPage />} />
    <Route path={EVENT_CENTER_PATHS.warnings} element={<WarningsPage />} />
    <Route path={EVENT_CENTER_PATHS.information} element={<InformationPage />} />
    <Route path={EVENT_CENTER_PATHS.timeline} element={<EventTimelinePage />} />
    <Route path={EVENT_CENTER_PATHS.search} element={<EventSearchPage />} />
    <Route path={EVENT_CENTER_PATHS.details} element={<EventDetailsPage />} />
    <Route path={EVENT_CENTER_PATHS.replay} element={<EventReplayPage />} />
    <Route path={EVENT_CENTER_PATHS.export} element={<EventExportPage />} />
    <Route path={EVENT_CENTER_PATHS.statistics} element={<EventStatisticsPage />} />
  </Route>
);
