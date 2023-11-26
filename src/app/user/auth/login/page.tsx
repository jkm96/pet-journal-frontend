"use client";
import React, {useState} from "react";
import LoginForm from "@/components/user/auth/LoginForm";
import {useAuth} from "@/hooks/useAuth";
import {RedirectUser} from "@/components/common/auth/RedirectUser";
import Loader from "@/components/common/Loader";

export default function LoginPage() {
    const {user,loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);

    RedirectUser(user,setLoading)

    if (loading || authLoading) {
        return <Loader/>;
    } else if (!user) {
        return <LoginForm/>;
    } else {
        return null;
    }
};
