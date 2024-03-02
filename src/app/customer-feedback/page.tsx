'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';
import { RedirectUserToDashboard } from '@/components/common/auth/RedirectUserToDashboard';
import Loader from '@/components/common/dashboard/Loader';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { CustomerFeedback } from '@/components/site/CustomerFeedback';

export default function CustomerFeedbackPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  RedirectUserToDashboard(user, setLoading);

  if (loading || authLoading) {
    return <Loader />;
  } else if (!user) {
    return <CustomerFeedback />;
  } else {
    router.push(NAVIGATION_LINKS.USER_DASHBOARD);
  }
}
