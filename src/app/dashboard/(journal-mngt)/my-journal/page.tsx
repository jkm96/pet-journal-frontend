"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import PetProfilesOverview from "@/components/dashboard/petmngt/pets/profile/PetProfilesOverviewSection";
import JournalEntriesOverview from "@/components/dashboard/journalmngt/journalentries/JournalEntriesOverview";
import MyJournalOverview from "@/components/dashboard/journalmngt/myjournal/MyJournalOverview";

function MyJournalPage({ searchParams }: { searchParams?: { query?: string; periodFrom?: string; periodTo?: string; }; }) {
    return (
        <>
            <MyJournalOverview searchParams={searchParams} />
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(MyJournalPage)