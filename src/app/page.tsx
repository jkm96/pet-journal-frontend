"use client";
import Loader from '@/components/common/dashboard/Loader';
import React, { useEffect, useState } from 'react';
import Home from '@/components/site/Home';

export default function HomePage() {
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
        return <Home/>;
    }
}
