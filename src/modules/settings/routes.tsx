import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { SettingsLayout } from '@/modules/settings/layout/SettingsLayout';
import { SETTINGS_PATHS } from '@/modules/settings/constants/paths';

import { SystemOverviewPage } from '@/modules/settings/pages/SystemOverviewPage';
import { GeneralSettingsPage } from '@/modules/settings/pages/GeneralSettingsPage';
import { AppearancePage } from '@/modules/settings/pages/AppearancePage';
import { NetworkPage } from '@/modules/settings/pages/NetworkPage';
import { NotificationsPage } from '@/modules/settings/pages/NotificationsPage';
import { EmailPage } from '@/modules/settings/pages/EmailPage';
import { SmsPage } from '@/modules/settings/pages/SmsPage';
import { BackupPage } from '@/modules/settings/pages/BackupPage';
import { RestorePage } from '@/modules/settings/pages/RestorePage';
import { DatabasePage } from '@/modules/settings/pages/DatabasePage';
import { ServicesPage } from '@/modules/settings/pages/ServicesPage';
import { SystemLogsPage } from '@/modules/settings/pages/SystemLogsPage';
import { AuditLogsPage } from '@/modules/settings/pages/AuditLogsPage';

/**
 * Sprint 14 — Settings module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>, mirroring the
 * Sprint 3/4 registration pattern. ROUTES.settings already existed as a
 * placeholder entry — this replaces only that placeholder registration.
 */
export const settingsRoutes = (
  <Route key="settings" path={ROUTES.settings} element={<SettingsLayout />}>
    <Route index element={<SystemOverviewPage />} />
    <Route path={SETTINGS_PATHS.general} element={<GeneralSettingsPage />} />
    <Route path={SETTINGS_PATHS.appearance} element={<AppearancePage />} />
    <Route path={SETTINGS_PATHS.network} element={<NetworkPage />} />
    <Route path={SETTINGS_PATHS.notifications} element={<NotificationsPage />} />
    <Route path={SETTINGS_PATHS.email} element={<EmailPage />} />
    <Route path={SETTINGS_PATHS.sms} element={<SmsPage />} />
    <Route path={SETTINGS_PATHS.backup} element={<BackupPage />} />
    <Route path={SETTINGS_PATHS.restore} element={<RestorePage />} />
    <Route path={SETTINGS_PATHS.database} element={<DatabasePage />} />
    <Route path={SETTINGS_PATHS.services} element={<ServicesPage />} />
    <Route path={SETTINGS_PATHS.logs} element={<SystemLogsPage />} />
    <Route path={SETTINGS_PATHS.audit} element={<AuditLogsPage />} />
  </Route>
);
