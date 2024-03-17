import { NextRequest } from 'next/server';
import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petDiariesApiClient from '@/lib/axios/axiosClient';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const response = await petDiariesApiClient
      .post('api/v1/user/register', requestBody);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}
