"use client";

import AuthorizeComponent from '@/components/common/auth/AuthorizeComponent';
import PetJournalPermission, { MapPermission } from '@/boundary/enums/permissions';
import UserSettingsOverview from '@/components/dashboard/user/settings/UserSettingsOverview';

function UserSettingsPage() {
    return (
        <>
            <UserSettingsOverview/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(UserSettingsPage)