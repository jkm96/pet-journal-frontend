import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import petJournalApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { journalId: string } }) {
  try {
    const journalId = params.journalId;
    const config = getAxiosConfigs(request);
    const response = await petJournalApiClient.get(`api/v1/journal-entry/${journalId}/attachment`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}