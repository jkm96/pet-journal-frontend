"use client";

import AuthorizeComponent from '@/components/common/auth/AuthorizeComponent';
import PetJournalPermission, { MapPermission } from '@/boundary/enums/permissions';
import ManageJournalEntry from '@/components/dashboard/user/journalmngt/journalentries/ManageJournalEntry';
import MagicStudioEditor from '@/components/magicstudio/MagicStudioEditor';

function MagicStudioEditorPage({params}: { params: { projectSlug: string } }) {
    return (
        <>
            <MagicStudioEditor slug={params.projectSlug}/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(MagicStudioEditorPage)