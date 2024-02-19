"use client";
import React, { useEffect, useState } from 'react';
import Loader from '@/components/common/dashboard/Loader';
import PaymentCheckout from '@/components/payments/PaymentCheckout';

export default function PaymentsPage() {
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
        return <PaymentCheckout/>;
    }
};
