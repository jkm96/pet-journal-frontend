import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {getJournalQueryParams} from "@/helpers/urlHelpers";

export async function GET(request: NextRequest) {
    try {
        const onlyPino = require('pino')()
        const queryParams = getJournalQueryParams(request);
        onlyPino.info(queryParams,"query params")
        const config = getAxiosConfigs(request, queryParams);
        const response = await petJournalApiClient.get('journal-entry', config);
        onlyPino.info(response,"fetch journal entries response")
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        const onlyPino = require('pino')()
        onlyPino.error(error,"An error occurred fetching journal entries")
        return handleApiException(error);
    }
}