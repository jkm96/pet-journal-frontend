"use client";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {useAuth} from "@/hooks/useAuth";
import Loader from "@/components/common/dashboard/Loader";
import React, {useState} from "react";
import {RedirectUserToDashboard} from "@/components/common/auth/RedirectUserToDashboard";
import {useRouter} from "next/navigation";
import Home from "@/components/home/Home";

export default function HomePage() {
    const router = useRouter()
    const {user, loading: authLoading} = useAuth();
    const [loading, setLoading] = useState(true);

    RedirectUserToDashboard(user, setLoading)

    if (loading || authLoading) {
        return <Loader/>;
    } else if (!user) {
        return <Home/>
    } else {
        router.push(NAVIGATION_LINKS.USER_DASHBOARD);
    }
}
