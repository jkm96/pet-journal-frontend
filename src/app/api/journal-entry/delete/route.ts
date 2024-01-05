import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const config = getAxiosConfigs(request);
        const body = await request.json();
        const {journalId} = body;
        const response = await petJournalApiClient
            .delete(`journal-entry/${journalId}/delete`, config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}