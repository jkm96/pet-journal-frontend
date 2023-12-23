"use client";
import React, {useState} from "react";
import LoginForm from "@/components/user/auth/LoginForm";
import {useAuth} from "@/hooks/useAuth";
import {RedirectUserToDashboard} from "@/components/common/auth/RedirectUserToDashboard";
import Loader from "@/components/common/dashboard/Loader";
import PaymentCheckout from "@/components/payments/PaymentCheckout";
import {redirect} from "next/navigation";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";

export default function PaymentsPage() {
    const {user,loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);

    RedirectUserToDashboard(user,setLoading)

    if (loading || authLoading) {
        return <Loader/>;
    } else if (user && !user.isSubscribed) {
        return <PaymentCheckout/>;
    } else if(!user){
        redirect(NAVIGATION_LINKS.LOGIN)
    }
};
