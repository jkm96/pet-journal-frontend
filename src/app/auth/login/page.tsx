'use client';
import React, { useEffect, useState } from 'react';
import LoginForm from '@/components/auth/user/LoginForm';
import Loader from '@/components/common/dashboard/Loader';
import { HtmlPageHead } from '@/lib/utils/seoUtils';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); //1 second

    return () => clearTimeout(timeout);
  }, []);

  const title = 'Login - Online Diary for Pet Lovers. Keep your pet memories together';
  const description = 'Pet Diaries helps you save your daily memories, download them at any time, and print them beautifully.';
  const type = "website"

  HtmlPageHead(title,description,type);

  if (loading) {
    return <Loader />;
  } else {
    return <LoginForm />;
  }
};
