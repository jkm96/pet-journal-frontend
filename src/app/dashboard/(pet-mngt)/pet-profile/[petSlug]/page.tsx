"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import ManagePetProfile from "@/components/petmngt/pets/profile/ManagePetProfile";

function ManagePetProfilePage({params}: { params: { slug: string } }) {
    return (
        <>
            <ManagePetProfile slug={params.slug}/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(ManagePetProfilePage)