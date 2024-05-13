import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';
import { getMagicStudioQueryParams } from '@/helpers/urlHelpers';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const queryParams = getMagicStudioQueryParams(data.queryParams);
    const config = getAxiosConfigs(request, queryParams);
    const response = await petDiariesApiClient.get('api/v1/magic-studio/list', config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}