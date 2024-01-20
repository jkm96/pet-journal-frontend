"use client";
import Link from "next/link";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {useAuth} from "@/hooks/useAuth";
import Loader from "@/components/common/dashboard/Loader";
import React, {useState} from "react";
import {RedirectUserToDashboard} from "@/components/common/auth/RedirectUserToDashboard";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()
    const {user, loading: authLoading} = useAuth();
    const [loading, setLoading] = useState(true);

    RedirectUserToDashboard(user, setLoading)

    if (loading || authLoading) {
        return <Loader/>;
    } else if (!user) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Link href={NAVIGATION_LINKS.LOGIN} className="text-red-600">Sign In</Link>
            </main>
        )
    } else {
        router.push(NAVIGATION_LINKS.USER_DASHBOARD);
    }
}
