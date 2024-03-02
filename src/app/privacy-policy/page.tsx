'use client';
import React, { useEffect, useState } from 'react';
import Loader from '@/components/common/dashboard/Loader';
import { PrivacyPolicy } from '@/components/site/PrivacyPolicy';

export default function PrivacyPolicyPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); //1 second

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return <PrivacyPolicy />;
  }
}
