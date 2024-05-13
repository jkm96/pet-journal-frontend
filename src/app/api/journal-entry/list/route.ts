import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';
import { getJournalQueryParams } from '@/helpers/urlHelpers';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const queryParams = getJournalQueryParams(data.queryParams);
    const config = getAxiosConfigs(request, queryParams);
    const response = await petDiariesApiClient.get('api/v1/journal-entry', config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}