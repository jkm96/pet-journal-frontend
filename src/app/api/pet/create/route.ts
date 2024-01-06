import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const config = getAxiosConfigs(request);
        const formData = await request.formData();
        const response = await petJournalApiClient
            .post('api/v1/pet/create', formData, config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}