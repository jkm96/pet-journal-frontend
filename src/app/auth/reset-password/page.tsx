'use client';
import React from 'react';
import ChangePassword from '@/components/auth/user/ChangePassword';
import { HtmlPageHead } from '@/lib/utils/seoUtils';

export default function ChangePasswordPage() {

  const title = 'Reset Password - Online Diary for Pet Lovers. Keep your pet memories together';
  const description = 'Pet Diaries helps you save your daily memories, download them at any time, and print them beautifully.';
  const type = "website"

  HtmlPageHead(title,description,type);

  return <ChangePassword />;
};
