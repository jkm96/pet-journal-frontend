import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {AxiosRequestConfig} from "axios";
import {cookieName} from "@/boundary/constants/appConstants";
import {AccessTokenModel} from "@/boundary/interfaces/token";

export async function GET(request: NextRequest) {
    try {
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${tokenData.token.token}`
            }
        };

        const response = await petJournalApiClient.get('pet/profiles', config);
        console.log("petmngt-profile profile api response", response.data)

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}