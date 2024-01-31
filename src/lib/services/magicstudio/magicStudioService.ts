import { apiKey, internalBaseUrl } from '@/boundary/constants/appConstants';
import { CreateMagicProjectRequest } from '@/boundary/interfaces/magicStudio';

export async function createProject(createRequest: CreateMagicProjectRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/magic-studio/create`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(createRequest),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}