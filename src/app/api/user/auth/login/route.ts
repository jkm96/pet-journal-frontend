import {handleAxiosResponse, handleApiException} from "@/helpers/responseHelpers";
import petJournalApiClient from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.text();
        const response = await petJournalApiClient
            .post('user/login', `${requestBody}`);
console.log("login api response",response.data)
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}