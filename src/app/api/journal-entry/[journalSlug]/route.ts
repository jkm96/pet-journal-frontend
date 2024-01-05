import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest, {params}: { params: { journalSlug: string } }) {
    try {
        const journalSlug = params.journalSlug;
        const config = getAxiosConfigs(request);
        const response = await petJournalApiClient.get(`journal-entry/${journalSlug}`, config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}