"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import PetProfilesOverview from "@/components/pet/pets/profile/PetProfilesOverviewSection";

function PetProfilesPage() {
    return (
        <>
            <PetProfilesOverview/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(PetProfilesPage)