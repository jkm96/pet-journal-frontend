import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {cookieName} from "@/boundary/constants/appConstants";
import {AccessTokenModel} from "@/boundary/interfaces/token";
import {AxiosRequestConfig} from "axios";

export async function POST(request: NextRequest) {
    try {
        const config = getAxiosConfigs(request);
        const requestBody = await request.json();
        const { petId } = requestBody;
        const response = await petJournalApiClient
            .post(`pet-trait/${petId}/create`, requestBody,config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}