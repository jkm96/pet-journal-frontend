"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import PetProfilesOverview from "@/components/dashboard/petmngt/pets/profile/PetProfilesOverviewSection";
import JournalEntriesOverview from "@/components/dashboard/journalmngt/journalentries/JournalEntriesOverview";

function JournalEntriesPage() {
    return (
        <>
            <JournalEntriesOverview/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(JournalEntriesPage)