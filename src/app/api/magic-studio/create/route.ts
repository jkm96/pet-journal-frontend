import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request);
    const requestBody = await request.json();
    const response = await petDiariesApiClient
      .post('api/v1/magic-studio', requestBody, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}