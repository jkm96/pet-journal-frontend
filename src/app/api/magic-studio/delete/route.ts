import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request);
    const body = await request.json();
    const { projectId: projectId } = body;
    const response = await petDiariesApiClient
      .delete(`api/v1/magic-studio/${projectId}/delete`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}