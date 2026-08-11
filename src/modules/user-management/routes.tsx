import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { UserManagementLayout } from '@/modules/user-management/layout/UserManagementLayout';
import { USER_MANAGEMENT_PATHS } from '@/modules/user-management/constants/paths';

import { UsersPage } from '@/modules/user-management/pages/UsersPage';
import { UserProfilePage } from '@/modules/user-management/pages/UserProfilePage';
import { RolesPage } from '@/modules/user-management/pages/RolesPage';
import { PermissionsPage } from '@/modules/user-management/pages/PermissionsPage';
import { ModuleAccessPage } from '@/modules/user-management/pages/ModuleAccessPage';
import { AccessGroupsPage } from '@/modules/user-management/pages/AccessGroupsPage';
import { SessionsPage } from '@/modules/user-management/pages/SessionsPage';
import { UserActivityPage } from '@/modules/user-management/pages/UserActivityPage';

/**
 * Sprint 14 — User Management module route tree.
 * Consumed by AppRoutes.tsx as a single nested <Route>, mirroring the
 * Sprint 3/4 registration pattern. ROUTES.users already existed as a
 * placeholder entry — this replaces only that placeholder registration.
 */
export const userManagementRoutes = (
  <Route key="user-management" path={ROUTES.users} element={<UserManagementLayout />}>
    <Route index element={<UsersPage />} />
    <Route path={USER_MANAGEMENT_PATHS.profile} element={<UserProfilePage />} />
    <Route path={USER_MANAGEMENT_PATHS.roles} element={<RolesPage />} />
    <Route path={USER_MANAGEMENT_PATHS.permissions} element={<PermissionsPage />} />
    <Route path={USER_MANAGEMENT_PATHS.moduleAccess} element={<ModuleAccessPage />} />
    <Route path={USER_MANAGEMENT_PATHS.accessGroups} element={<AccessGroupsPage />} />
    <Route path={USER_MANAGEMENT_PATHS.sessions} element={<SessionsPage />} />
    <Route path={USER_MANAGEMENT_PATHS.activity} element={<UserActivityPage />} />
  </Route>
);
