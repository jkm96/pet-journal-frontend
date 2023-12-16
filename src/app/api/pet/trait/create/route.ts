import {handleAxiosResponse, handleApiException} from "@/helpers/responseHelpers";
import petJournalApiClient from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {cookieName} from "@/boundary/constants/appConstants";
import {AccessTokenModel} from "@/boundary/interfaces/token";
import {AxiosRequestConfig} from "axios";

export async function POST(request: NextRequest) {
    try {
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${tokenData.token.token}`,
            }
        };
        const requestBody = await request.json();
        const { petId } = requestBody;
        const response = await petJournalApiClient
            .post(`pet-trait/${petId}/create`, requestBody,config);
        console.log("add pet traits response", response.data)
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}