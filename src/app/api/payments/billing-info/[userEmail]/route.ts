import { NextRequest } from 'next/server';
import petDiariesApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';

export async function GET(request: NextRequest, { params }: { params: { userEmail: string } }) {
  try {
    const userEmail = params.userEmail;
    const config = getAxiosConfigs(request);
    const response = await petDiariesApiClient.get(`api/v1/payment/billing-info/${userEmail}`, config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}