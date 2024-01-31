"use client";

import ManageUserSection from '@/components/dashboard/admin/manageusers/ManageUserSection';

function ManageUserPage({params}: { params: { userId: number } }) {
    return (
        <>
            <ManageUserSection userId={params.userId}/>
        </>
    )
}

export default ManageUserPage