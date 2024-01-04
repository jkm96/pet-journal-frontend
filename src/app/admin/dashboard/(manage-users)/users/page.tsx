"use client";

import UsersOvervewSection from "@/components/dashboard/admin/manageusers/UsersOvervewSection";

function ManageUsersPage({ searchParams }: { searchParams?: { searchTerm?: string;}}) {
    return (
        <>
            <UsersOvervewSection searchParams={searchParams}/>
        </>
    )
}
export default ManageUsersPage