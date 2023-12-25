import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {AxiosRequestConfig} from "axios";
import {cookieName} from "@/boundary/constants/appConstants";
import {AccessTokenModel} from "@/boundary/interfaces/token";

export async function GET(request: NextRequest) {
    try {
        console.log("request",request.cookies.getAll())
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
        console.log("tokenCookie",tokenCookie)
        console.log("tokenData",tokenData)
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${tokenData.token.token}`
            }
        };
        console.log("config",config)
        const response = await petJournalApiClient.get('pet/profiles', config);
        console.log("pet profile api response", response.data)

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}