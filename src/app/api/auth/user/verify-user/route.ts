import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const response = await petJournalApiClient
            .post('api/v1/user/verify-email', requestBody);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}