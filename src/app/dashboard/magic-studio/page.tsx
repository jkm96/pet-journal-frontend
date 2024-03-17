'use client';

import AuthorizeComponent from '@/components/common/auth/AuthorizeComponent';
import PetJournalPermission, { MapPermission } from '@/boundary/enums/permissions';
import MagicStudio from '@/components/magicstudio/MagicStudio';

function MagicStudioPage() {
  return (
    <>
      <MagicStudio />
    </>
  );
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView);
export default AuthorizeComponent([viewPermission])(MagicStudioPage);