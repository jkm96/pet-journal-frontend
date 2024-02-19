"use client";
import React, { useEffect, useState } from 'react';
import Loader from '@/components/common/dashboard/Loader';
import CheckoutReturn from '@/components/payments/CheckoutReturn';

export default function CheckoutReturnPage() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000); //1 second

        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return <Loader/>;
    } else {
        return <CheckoutReturn/>;
    }
};
