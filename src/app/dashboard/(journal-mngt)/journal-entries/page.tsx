"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import JournalEntriesOverview from "@/components/dashboard/user/journalmngt/journalentries/JournalEntriesOverview";

function JournalEntriesPage({searchParams}: { searchParams?: { searchTerm?: string; } }) {
    return (
        <>
            <JournalEntriesOverview searchParams={searchParams}/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(JournalEntriesPage)