import { apiKey, internalBaseUrl } from '@/boundary/constants/appConstants';
import { SiteContentQueryParameters } from '@/boundary/parameters/contentQueryParameters';

export async function fetchPrivacyPolicy(queryParams: SiteContentQueryParameters) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/site-content/${JSON.stringify(queryParams)}`, {
      method: 'GET',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: null,
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}