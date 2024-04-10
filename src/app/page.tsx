'use client';
import Loader from '@/components/common/dashboard/Loader';
import React, { useEffect, useState } from 'react';
import Home from '@/components/site/Home';
import { HtmlPageHead } from '@/lib/utils/seoUtils';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); //1 second

    return () => clearTimeout(timeout);
  }, []);

  const title = 'Pet Diaries - Online Diary for Pet Lovers. Keep your pet memories together';
  const description = 'Pet Diaries is an online diary for pet lovers. It helps you save your daily memories, download them at any time, and print them beautifully.';
  const type = "website"

  HtmlPageHead(title,description,type);

  if (loading) {
    return <Loader />;
  } else {
    return <Home/>;
  }
}
