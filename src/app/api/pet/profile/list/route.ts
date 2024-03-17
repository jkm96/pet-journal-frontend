import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request);
    const response = await petDiariesApiClient.get('api/v1/pet/profiles', config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}