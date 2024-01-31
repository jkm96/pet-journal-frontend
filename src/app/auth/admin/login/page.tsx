"use client";
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RedirectUserToDashboard } from '@/components/common/auth/RedirectUserToDashboard';
import Loader from '@/components/common/dashboard/Loader';
import AdminLoginForm from '@/components/auth/admin/AdminLoginForm';

export default function AdminLoginPage() {
    const {user, loading: authLoading} = useAuth();
    const [loading, setLoading] = useState(true);

    RedirectUserToDashboard(user, setLoading)

    if (loading || authLoading) {
        return <Loader/>;
    } else if (!user) {
        return <AdminLoginForm/>;
    }
};
