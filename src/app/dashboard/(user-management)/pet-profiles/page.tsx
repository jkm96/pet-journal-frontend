"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import PetProfilesOverviewSection from "@/components/user/pets/profile/PetProfilesOverviewSection";

function PetProfilesOverview() {
    return (
        <>
            <PetProfilesOverviewSection/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(PetProfilesOverview)