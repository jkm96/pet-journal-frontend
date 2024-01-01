"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import JournalEntriesOverview from "@/components/dashboard/user/journalmngt/journalentries/JournalEntriesOverview";
import ManageUsersSection from "@/components/dashboard/admin/manageusers/ManageUsersSection";

function ManageUsersPage({ searchParams }: { searchParams?: { searchTerm?: string;}}) {
    return (
        <>
            <ManageUsersSection searchParams={searchParams}/>
        </>
    )
}
export default ManageUsersPage