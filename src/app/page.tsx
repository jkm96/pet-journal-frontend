import Home from '@/components/site/Home';
import { Metadata } from 'next';
import { getMetadata } from '@/lib/utils/seoUtils';

const title = 'Pet Diaries - Online Diary for Pet Lovers. Keep your pet memories together';
const description = 'Pet Diaries is an online diary for pet lovers. It helps you save your daily memories, download them at any time, and print them beautifully.';


// export const metadata: Metadata = getMetadata(title,description,type);

export async function generateMetadata( ): Promise<Metadata> {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  console.log("currentUrl",currentUrl)

  return getMetadata(title,description);
}
async function HomePage() {

  // const title = 'Pet Diaries - Online Diary for Pet Lovers. Keep your pet memories together';
  // const description = 'Pet Diaries is an online diary for pet lovers. It helps you save your daily memories, download them at any time, and print them beautifully.';
  // const type = "website"

  // HtmlPageHead(title,description,type);

  // if (loading) {
  //   return <Loader />;
  // } else {
  //   return <Home/>;
  // }

  return (
    <>
      <Home />
    </>
  );
}

export default HomePage;