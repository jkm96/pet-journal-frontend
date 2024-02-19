import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petJournalApiClient from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';
import { getContentQueryParams } from '@/helpers/urlHelpers';
import { AxiosRequestConfig } from 'axios';

export async function GET(request: NextRequest, {params}: { params: { queryParams: string } }) {
    try {
        const queryParams = getContentQueryParams(params.queryParams);
        const config: AxiosRequestConfig = {
            params: queryParams
        };
        const response = await petJournalApiClient.get('api/v1/site-content', config);
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}