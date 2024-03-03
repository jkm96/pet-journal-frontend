'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { RedirectUserToDashboard } from '@/components/common/auth/RedirectUserToDashboard';
import Loader from '@/components/common/dashboard/Loader';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { CustomerFeedback } from '@/components/site/CustomerFeedback';
import { PrivacyPolicy } from '@/components/site/PrivacyPolicy';

export default function CustomerFeedbackPage() {
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
    return <CustomerFeedback />;
  }
}
