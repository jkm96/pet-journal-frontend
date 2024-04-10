'use client';

import React from 'react';
import MainNavbar from '@/components/site/sections/MainNavbar';
import { Benefits } from '@/components/site/sections/Benefits';
import { Footer } from '@/components/site/sections/Footer';

export default function Features() {
  return (
    <>
      <MainNavbar/>

      <main className='relative mb-4 mt-4'>
        <Benefits />
      </main>

      <Footer />
    </>
  );
}