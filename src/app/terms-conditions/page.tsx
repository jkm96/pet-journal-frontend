"use client";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';
import { RedirectUserToDashboard } from '@/components/common/auth/RedirectUserToDashboard';
import Loader from '@/components/common/dashboard/Loader';
import Home from '@/components/home/Home';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { PrivacyPolicy } from '@/components/home/PrivacyPolicy';
import { TermsAndConditions } from '@/components/home/TermsAndConditions';

export default function TermsConditionsPage() {
  const router = useRouter()
  const {user, loading: authLoading} = useAuth();
  const [loading, setLoading] = useState(true);

  RedirectUserToDashboard(user, setLoading)

  if (loading || authLoading) {
    return <Loader/>;
  } else if (!user) {
    return <TermsAndConditions/>
  } else {
    router.push(NAVIGATION_LINKS.USER_DASHBOARD);
  }
}
