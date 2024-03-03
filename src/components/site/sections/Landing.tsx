import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { Button } from '@nextui-org/react';
import React from 'react';
import Link from 'next/link';

export function Landing() {
  return (
    <section className='bg-gray-50' id='home'>
      <div className='relative pt-8 sm:pt-24 pb-4'>
        <div className='mx-auto max-w-5xl px-4 sm:px-6'>
          <div className='text-center'>
            <h1
              className='animate__animated animate__fadeIn text-3xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-black-2'>
              <span className='block'>Your Pet Photo Diary</span><span
              className='block text-primary'>digital &amp; print</span></h1>
            <div
              className='mt-3 max-w-md mx-auto text-base text-gray-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate__animated animate__fadeIn'>

              <div className='flex justify-center'>
                <div className=''>

                  <p className='text-body'><b>Save your daily memories, download them at
                    any time, and print them
                    beautifully.</b></p>

                  <div className='mt-8 mb-8'>
                    <Link href={NAVIGATION_LINKS.REGISTER}>
                      <Button color='primary'
                              size='lg'
                              className='px-8 py-4 text-center border border-transparent rounded-md font-medium text-white'>
                        Get Started with Pet Diaries
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}