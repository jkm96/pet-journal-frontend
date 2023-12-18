import {handleAxiosResponse, handleApiException} from "@/helpers/responseHelpers";
import petJournalApiClient from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {AxiosRequestConfig} from "axios";
import {cookieName} from "@/boundary/constants/appConstants";
import {AccessTokenModel} from "@/boundary/interfaces/token";
import {getJournalQueryParams} from "@/helpers/urlHelpers";

export async function GET(request: NextRequest) {
    try {
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
        const queryParams = getJournalQueryParams(request);
        console.log("query Params",queryParams)
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${tokenData.token.token}`
            },
            params: queryParams
        };

        const response = await petJournalApiClient.get('journal-entry', config);
        console.log("journal entry api response", response.data)

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}