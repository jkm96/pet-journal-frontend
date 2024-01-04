import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {AxiosRequestConfig} from "axios";
import {cookieName} from "@/boundary/constants/appConstants";
import {AccessTokenModel} from "@/boundary/interfaces/token";
import {getJournalQueryParams} from "@/helpers/urlHelpers";

export async function GET(request: NextRequest) {
    try {
        const queryParams = getJournalQueryParams(request);
        const config = getAxiosConfigs(request,queryParams);
        const response = await petJournalApiClient.get('journal-entry', config);

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}