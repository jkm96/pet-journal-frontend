import MainNavbar from '@/components/shared/navs/navbar/MainNavbar';
import React, { useEffect, useState } from 'react';
import { Footer } from '@/components/site/sections/Footer';
import DOMPurify from 'dompurify';
import { fetchPrivacyPolicy } from '@/lib/services/sitecontent/siteContentService';
import { toast } from 'react-toastify';
import { SiteContentQueryParameters } from '@/boundary/parameters/contentQueryParameters';

export function PrivacyPolicy() {
  const [htmlContent, setHtmlContent] = useState('');

  const fetchContent = async () =>{
    const param = new SiteContentQueryParameters();
    param.type = "privacy"
    await fetchPrivacyPolicy(param)
      .then((response) => {
        if (response.statusCode === 200) {
          const content = response.data.content;
          const sanitizedContent = DOMPurify.sanitize(content);
          setHtmlContent(sanitizedContent);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching privacy policy: ${error}`);
      });
  }

  useEffect(() => {
    fetchContent()
  }, []);

  return (
    <>
      <MainNavbar />

      <main className='relative'>
        <section className='bg-gray-50'>
          <div className='relative pb-4'>
            <div className='mx-auto max-w-5xl px-4 sm:px-6'>
              <p
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}