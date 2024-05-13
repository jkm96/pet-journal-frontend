import { TermsAndConditions } from '@/components/site/TermsAndConditions';
import { Metadata } from 'next';
import { getPageMetadata } from '@/lib/utils/seoUtils';

const title = 'Terms & Conditions - Online Diary for Pet Lovers.';
const description = 'Pet Diaries helps you save your daily memories, download them at any time, and print them beautifully.';
export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(title, description);
}

export default function TermsConditionsPage() {
  return <TermsAndConditions />;
}
