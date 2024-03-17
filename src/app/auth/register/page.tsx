'use client';
import React, { useEffect, useState } from 'react';
import RegisterForm from '@/components/auth/user/RegisterForm';
import Loader from '@/components/common/dashboard/Loader';

export default function RegisterPage() {
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
    return <RegisterForm />;
  }
};

