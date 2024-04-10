import React from 'react';
import Features from '@/components/site/Features';

export default function FeaturesPage() {
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); //1 second
  //
  //   return () => clearTimeout(timeout);
  // }, []);
  //
  // const title = 'Features - Online Diary for Pet Lovers. Keep your pet memories together';
  // const description = 'Pet Diaries helps you save your daily memories, download them at any time, and print them beautifully.';
  // const type = "website"
  //
  // HtmlPageHead(title,description,type);

  // if (loading) {
  //   return <Loader />;
  // } else {
  //   return <Features />;
  // }
  return <Features />;
}
