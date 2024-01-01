"use client";

import AuthorizeComponent from "@/components/common/auth/AuthorizeComponent";
import PetJournalPermission, {MapPermission} from "@/boundary/enums/permissions";
import UserDashboardSection from "@/components/dashboard/user/UserDashboardSection";
import AdminDashboardSection from "@/components/dashboard/admin/AdminDashboardSection";

function AdminDashboardPage() {
    return (
        <>
            <AdminDashboardSection/>
        </>
    )
}
export default AdminDashboardPage