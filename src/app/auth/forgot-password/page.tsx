'use client';
import React, { useEffect, useState } from 'react';
import LoginForm from '@/components/auth/user/LoginForm';
import Loader from '@/components/common/dashboard/Loader';
import { ForgotPasswordForm } from '@/components/auth/user/ForgotPasswordForm';

export default function ForgotPasswordPage() {
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
    return <ForgotPasswordForm />;
  }
};
