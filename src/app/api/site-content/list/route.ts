import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';
import { getContentQueryParams } from '@/helpers/urlHelpers';
import { AxiosRequestConfig } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const queryParams = getContentQueryParams(data.queryParams);
    const config: AxiosRequestConfig = {
      params: queryParams,
    };
    const response = await petDiariesApiClient.get('api/v1/site-content/list', config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}