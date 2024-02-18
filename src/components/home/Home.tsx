import React from 'react';
import MainNavbar from '@/components/shared/navs/navbar/MainNavbar';
import { Benefits } from '@/components/home/sections/Benefits';
import { Landing } from '@/components/home/sections/Landing';
import { Pricing } from '@/components/home/sections/Pricing';
import { Footer } from '@/components/home/sections/Footer';

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