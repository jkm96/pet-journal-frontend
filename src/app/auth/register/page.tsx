"use client";
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import RegisterForm from '@/components/auth/user/RegisterForm';
import { RedirectUserToDashboard } from '@/components/common/auth/RedirectUserToDashboard';
import Loader from '@/components/common/dashboard/Loader';
import { redirect } from 'next/navigation';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';

export default function RegisterPage() {
    const {user, loading: authLoading} = useAuth();
    const [loading, setLoading] = useState(true);

    RedirectUserToDashboard(user, setLoading)

    if (loading || authLoading) {
        return <Loader/>;
    } else if (!user) {
        return <RegisterForm/>;
    } else if (user && !user.isSubscribed) {
        redirect(NAVIGATION_LINKS.PAYMENTS)
    }
};

