import MemoriesIcon from '@/components/site/icons/MemoriesIcon';
import ArchiveIcon from '@/components/site/icons/ArchiveIcon';
import CustomizeIcon from '@/components/site/icons/CustomizeIcon';
import DownloadIcon from '@/components/site/icons/DownloadIcon';
import PrintIcon from '@/components/site/icons/PrintIcon';
import BackupIcon from '@/components/site/icons/BackupIcon';
import WebAppIcon from '@/components/site/icons/WebAppIcon';
import SupportIcon from '@/components/site/icons/SupportIcon';
import React from 'react';

export function Benefits() {
  return (
    <section className='bg-gray-50' id="features">
      <div className='max-w-7xl mx-auto py-0 px-4 sm:px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='mt-2 text-3xl font-extrabold text-black-2'>
            Discover the Unique Advantages of Pet Diaries
          </p>
          <p className='mt-4 text-lg text-gray-500'>
            Capture and cherish every moment with your pet through our feature-packed online pet
            diary!
          </p>
        </div>

        <dl
          className='mt-4 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8'>
          <div className='relative'>
            <dt>
              <MemoriesIcon />
              <p className='ml-9 text-lg leading-6 font-medium text-black-2'>Centralized Pet
                Memories</p>
            </dt>
            <dd className='mt-2 ml-9 text-base text-gray-500'>Bring all your pet memories together
              on a chronological timeline, with unlimited storage for photos and text entries.
              Easily navigate through time to relive those precious moments.
            </dd>
          </div>

          <div className='relative'>
            <dt>
              <ArchiveIcon />
              <p className='ml-9 text-lg leading-6 font-medium text-black-2'>Effortless Automatic
                Archive</p>
            </dt>
            <dd className='mt-2 ml-9 text-base text-gray-500'>Enjoy the convenience of Pet Diaries
              creating an automatic archive, sorted by years and months. Easily filter entries by
              periods and pets, making it a breeze to revisit specific moments.
            </dd>
          </div>

          <div className='relative'>
            <dt>
              <CustomizeIcon />
              <p className='ml-9 text-lg leading-6 font-medium text-black-2'>Personalized
                Experience</p>
            </dt>
            <dd className='mt-2 ml-9 text-base text-gray-500'>Tailor your pet diary to reflect your
              unique style. Customize backgrounds, fonts, and add stickers, avatar pictures, and
              text memories to make it truly yours.
            </dd>
          </div>

          <div className='relative'>
            <dt>
              <DownloadIcon />
              <p className='ml-9 text-lg leading-6 font-medium text-black-2'>
                Effortless Downloads
              </p>
            </dt>
            <dd className='mt-2 ml-9 text-base text-gray-500'>
              Download your pet diary effortlessly as a beautifully designed PDF.
              Choose specific entries to include and share with friends or print it
              out for a tangible keepsake.
            </dd>
          </div>

          <div className='relative'>
            <dt>
              <PrintIcon />
              <p className='ml-9 text-lg leading-6 font-medium text-black-2'>
                Automated Printing
              </p>
            </dt>
            <dd className='mt-2 ml-9 text-base text-gray-500'>
              Experience the convenience of printing high-end photobooks with just a few clicks.
              Combine entries seamlessly to create unique and personalized photo books
              that capture your cherished memories.
            </dd>
          </div>

          <div className='relative'>
            <dt>
              <BackupIcon />
              <p className='ml-9 text-lg leading-6 font-medium text-black-2'>
                Guaranteed Backup
              </p>
            </dt>
            <dd className='mt-2 ml-9 text-base text-gray-500'>
              Worried about losing memories? Pet Diaries guarantees the safety of your precious
              moments.
              Your memories are hosted with GDPR compliance and backed up using the highest
              technology standards.
            </dd>
          </div>

          <div className='relative'>
            <dt>
              <WebAppIcon />
              <p className='ml-9 text-lg leading-6 font-medium text-black-2'>
                Advantage Web App
              </p>
            </dt>
            <dd className='mt-2 ml-9 text-base text-gray-500'>
              Access your pet diaries seamlessly across different devices!
              Pet Diaries functions as a web app in your browser.
              Your diary is always up to date, ensuring a consistent experience on all your
              devices.
            </dd>
          </div>

          <div className='relative'>
            <dt>
              <SupportIcon />
              <p className='ml-9 text-lg leading-6 font-medium text-black-2'>Personal Support</p>
            </dt>
            <dd className='mt-2 ml-9 text-base text-gray-500'>
              Have questions, concerns, or ideas?
              Reach out to us! Our team is dedicated to providing personal support.
              Your satisfaction is our priority. We ensure you have the best experience with Pet
              Diaries.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}