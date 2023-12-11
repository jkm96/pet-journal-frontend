"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import ManageJournalEntry from "@/components/journalmngt/journalentries/ManageJournalEntry";

function ManageJournalEntryPage({params}: { params: { journalSlug: string } }) {
    return (
        <>
            <ManageJournalEntry slug={params.journalSlug}/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(ManageJournalEntryPage)