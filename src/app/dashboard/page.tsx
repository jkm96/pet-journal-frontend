'use client';

import AuthorizeComponent from '@/components/common/auth/AuthorizeComponent';
import PetJournalPermission, { MapPermission } from '@/boundary/enums/permissions';
import UserDashboardSection from '@/components/user/portal/UserDashboardSection';

function UserDashboardPage() {
  return (
    <>
      <UserDashboardSection />
    </>
  );
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView);
export default AuthorizeComponent([viewPermission])(UserDashboardPage);