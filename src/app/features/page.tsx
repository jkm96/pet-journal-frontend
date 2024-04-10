import Features from '@/components/site/Features';
import { getMetadata } from '@/lib/utils/seoUtils';
import { Metadata } from 'next';

const title = 'Features - Online Diary for Pet Lovers. Keep your pet memories together';
const description = 'Pet Diaries helps you save your daily memories, download them at any time, and print them beautifully.';
export async function generateMetadata(): Promise<Metadata> {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  console.log('currentUrl', currentUrl);

  return getMetadata(title, description);
}

export default function FeaturesPage() {
  return <Features />;
}
