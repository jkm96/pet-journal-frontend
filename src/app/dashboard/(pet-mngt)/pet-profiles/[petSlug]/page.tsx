'use client';

import AuthorizeComponent from '@/components/common/auth/AuthorizeComponent';
import PetJournalPermission, { MapPermission } from '@/boundary/enums/permissions';
import ManagePetProfile from '@/components/user/petmngt/pets/profile/ManagePetProfile';

function ManagePetProfilePage({ params }: { params: { petSlug: string } }) {
  return (
    <>
      <ManagePetProfile slug={params.petSlug} />
    </>
  );
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView);
export default AuthorizeComponent([viewPermission])(ManagePetProfilePage);