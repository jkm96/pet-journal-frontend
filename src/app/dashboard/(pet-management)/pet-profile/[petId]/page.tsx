"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import ManagePetProfile from "@/components/pet/pets/profile/ManagePetProfile";

function ManagePetProfilePage({params}: { params: { petId: number } }) {
    return (
        <>
            <ManagePetProfile petId={params.petId}/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(ManagePetProfilePage)