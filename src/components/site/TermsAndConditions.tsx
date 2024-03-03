import MainNavbar from '@/components/site/sections/MainNavbar';
import React, { useEffect, useState } from 'react';
import { Footer } from '@/components/site/sections/Footer';
import { SiteContentQueryParameters } from '@/boundary/parameters/contentQueryParameters';
import {  fetchSiteContentAsync } from '@/lib/services/sitecontent/siteContentService';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import { CircularProgress } from '@nextui-org/react';
import { SiteContentResponse } from '@/boundary/interfaces/siteContent';
import { formatDate } from '@/helpers/dateHelpers';

export function TermsAndConditions() {
  const [siteContent, setSiteContent] = useState({} as SiteContentResponse);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchContent = async () => {
    const param = new SiteContentQueryParameters();
    param.type = 'terms';
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
        toast.error(`Error fetching terms and conditions: ${error}`);
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
      <MainNavbar/>

      <main className='relative'>
        <section className='bg-gray-50'>
          <div className='relative pb-4'>
            <div className='mx-auto max-w-5xl px-4 sm:px-6'>
              {isLoading ? (
                <div className={'grid place-items-center'}>
                  <CircularProgress color={'primary'} className={'p-4'}
                                    label='Fetching terms and conditions ...' />
                </div>
              ) : (
                <>
                  {siteContent && siteContent.title ? (
                    <>
                      <h3 className='text-black-2 font-bold'>{siteContent.title}</h3>
                      <h4 className='mb-3 mt-3 text-black-2'>Last updated: {formatDate(siteContent.updatedAt)}</h4>
                      <p dangerouslySetInnerHTML={{ __html: siteContent.content }} />
                    </>
                  ) : (
                    <p className="text-center p-10">We are reviewing our terms and conditions</p>
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