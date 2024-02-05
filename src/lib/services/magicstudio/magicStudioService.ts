import { apiKey, internalBaseUrl } from '@/boundary/constants/appConstants';
import { CreateMagicProjectRequest, SavePdfRequest } from '@/boundary/interfaces/magicStudio';
import axios from 'axios';

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

export async function fetchMagicStudioProjects() {
  try {
    const response = await fetch(`${internalBaseUrl}/api/magic-studio/list`, {
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

export async function savePdfDocToDatabase(request:SavePdfRequest) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/magic-studio/save-pdf`, {
      method: 'POST',
      headers: {
        'x-api-key': `${apiKey}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getProjectDetails(projectSlug: string) {
  try {
    const response = await fetch(`${internalBaseUrl}/api/magic-studio/${projectSlug}`, {
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