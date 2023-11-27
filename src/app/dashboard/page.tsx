"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import DashboardSection from "@/components/user/dashboard/DashboardSection";

function DashboardPage() {
    return (
        <>
            <DashboardSection/>
        </>
    )
}

const viewPermission = MapPermission(PetJournalPermission.PermissionsUsersView)
export default AuthorizeComponent([viewPermission])(DashboardPage)