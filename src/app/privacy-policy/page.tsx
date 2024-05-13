import { PrivacyPolicy } from '@/components/site/PrivacyPolicy';
import { Metadata } from 'next';
import { getPageMetadata } from '@/lib/utils/seoUtils';

const title = 'Privacy Policy - Online Diary for Pet Lovers.';
const description = 'Pet Diaries helps you save your daily memories, download them at any time, and print them beautifully.';
export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(title, description);
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
