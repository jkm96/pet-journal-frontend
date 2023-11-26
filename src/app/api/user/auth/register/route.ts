import {NextRequest} from "next/server";
import {handleAxiosResponse, handleApiException} from "@/helpers/responseHelpers";
import petJournalApiClient from "@/lib/axios/axiosClient";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.text();
        const response = await petJournalApiClient
            .post('user/register', `${requestBody}`);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}
