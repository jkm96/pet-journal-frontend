import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const config = getAxiosConfigs(request);
        const requestBody = await request.json();
        const {journalId} = requestBody;
        const response = await petJournalApiClient
            .put(`journal-entry/${journalId}/edit`, requestBody, config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}