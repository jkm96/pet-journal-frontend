import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petJournalApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const config = getAxiosConfigs(request);
        const response = await petJournalApiClient.get('api/v1/magic-studio/list', config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}