import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petJournalApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const config = getAxiosConfigs(request);
        const requestBody = await request.json();
        console.log("request body",requestBody)
        const response = await petJournalApiClient
          .post("api/v1/magic-studio/save-pdf", requestBody, config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}