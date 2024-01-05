import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest, {params}: { params: { petSlug: string } }) {
    try {
        const petSlug = params.petSlug;
        const config = getAxiosConfigs(request);
        const response = await petJournalApiClient.get(`pet/${petSlug}/profile`, config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}