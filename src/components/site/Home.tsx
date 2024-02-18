import React from 'react';
import MainNavbar from '@/components/shared/navs/navbar/MainNavbar';
import { Benefits } from '@/components/site/sections/Benefits';
import { Landing } from '@/components/site/sections/Landing';
import { Pricing } from '@/components/site/sections/Pricing';
import { Footer } from '@/components/site/sections/Footer';

export default function Home() {
  return (
    <>
      <MainNavbar />

      <main className='relative'>
        <Landing />
        <Benefits />
        <Pricing />
      </main>

      <Footer />
    </>
  );
}