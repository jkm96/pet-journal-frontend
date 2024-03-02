import MainNavbar from '@/components/site/sections/MainNavbar';
import React, { useEffect, useState } from 'react';
import { Footer } from '@/components/site/sections/Footer';
import { SiteContentQueryParameters } from '@/boundary/parameters/contentQueryParameters';
import { fetchPrivacyPolicy } from '@/lib/services/sitecontent/siteContentService';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

export function TermsAndConditions() {
  const [htmlContent, setHtmlContent] = useState('');

  const fetchContent = async () => {
    const param = new SiteContentQueryParameters();
    param.type = 'terms';
    await fetchPrivacyPolicy(param)
      .then((response) => {
        if (response.statusCode === 200) {
          const content = response.data.content;
          const sanitizedContent = DOMPurify.sanitize(content);
          setHtmlContent(sanitizedContent);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching terms and conditions: ${error}`);
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

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}