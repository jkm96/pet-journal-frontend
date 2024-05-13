'use client';

import MainNavbar from '@/components/site/sections/MainNavbar';
import React, { useEffect, useState } from 'react';
import { Footer } from '@/components/site/sections/Footer';
import DOMPurify from 'dompurify';
import { fetchSiteContentAsync } from '@/lib/services/sitecontent/siteContentService';
import { toast } from 'react-toastify';
import { SiteContentQueryParameters } from '@/boundary/parameters/contentQueryParameters';
import { SiteContentResponse } from '@/boundary/interfaces/siteContent';
import { formatDateWithTime } from '@/helpers/dateHelpers';
import { CircularProgress } from '@nextui-org/react';

export function PrivacyPolicy() {
  const [siteContent, setSiteContent] = useState({} as SiteContentResponse);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchContent = async () => {
    setIsLoading(true);
    const param = new SiteContentQueryParameters();
    param.type = 'privacy';
    await fetchSiteContentAsync(param)
      .then((response) => {
        if (response.statusCode === 200) {
          const content: SiteContentResponse = response.data[0];
          if (content){
            content.content = DOMPurify.sanitize(content.content);
            setSiteContent(content);
          }
        }
      })
      .catch((error) => {
        toast.error(`Error fetching privacy policy: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <>
      <MainNavbar />

      <main className='relative'>
        <section className='bg-gray-50'>
          <div className='relative pb-4'>
            <div className='mx-auto max-w-5xl px-4 sm:px-6'>
              {isLoading ? (
                <div className={'grid place-items-center'}>
                  <CircularProgress color={'primary'} className={'p-4'}
                                    label='Fetching privacy policy ...' />
                </div>
              ) : (
                <>
                  {siteContent && siteContent.title ? (
                    <>
                      <h3 className='text-black-2 font-bold'>{siteContent.title}</h3>
                      <h4 className='mb-3 mt-3 text-black-2'>Last updated: {formatDateWithTime(siteContent.updatedAt)}</h4>
                      <p dangerouslySetInnerHTML={{ __html: siteContent.content }} />
                    </>
                  ) : (
                    <p className="text-center p-10">We are reviewing our privacy policy</p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}