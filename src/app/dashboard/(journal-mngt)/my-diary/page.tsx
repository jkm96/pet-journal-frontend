"use client";

import AuthorizeComponent from '@/components/common/auth/AuthorizeComponent';
import PetJournalPermission, { MapPermission } from '@/boundary/enums/permissions';
import MyJournalOverview from '@/components/dashboard/user/journalmngt/myjournal/MyJournalOverview';

function MyJournalPage() {
    return (
        <>
            <MyJournalOverview/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(MyJournalPage)