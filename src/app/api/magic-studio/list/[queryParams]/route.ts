import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';
import { getMagicStudioQueryParams } from '@/helpers/urlHelpers';

export async function GET(request: NextRequest, { params }: { params: { queryParams: string } }) {
  try {
    const queryParams = getMagicStudioQueryParams(params.queryParams);
    const config = getAxiosConfigs(request, queryParams);
    const response = await petDiariesApiClient.get('api/v1/magic-studio/list', config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}