import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.info("edit pet profile")
    const config = getAxiosConfigs(request);
    const requestBody = await request.json();
    const { petId } = requestBody;
    const response = await petDiariesApiClient.put(`api/v1/pet/${petId}/edit`, requestBody, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}