"use client";
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RedirectUserToDashboard } from '@/components/common/auth/RedirectUserToDashboard';
import Loader from '@/components/common/dashboard/Loader';
import CheckoutReturn from '@/components/payments/CheckoutReturn';
import { redirect } from 'next/navigation';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';

export default function CheckoutReturnPage() {
    const {user, loading: authLoading} = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    RedirectUserToDashboard(user, setIsLoading)

    if (isLoading || authLoading) {
        return <Loader/>;
    } else if (user) {
        return <CheckoutReturn/>;
    } else if (!user) {
        redirect(NAVIGATION_LINKS.LOGIN)
    }
};
