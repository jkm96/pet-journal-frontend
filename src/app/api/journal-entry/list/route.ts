import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {getJournalQueryParams} from "@/helpers/urlHelpers";
import logger from "@/logger/logger";
export async function POST(request: NextRequest) {
    try {
        logger.info(`reached api endpoint with ${JSON.stringify(request.nextUrl)}`)
        const queryParams = getJournalQueryParams(await request.json());
        logger.error(`reached api endpoint with ${JSON.stringify(queryParams)}`)
        const config = getAxiosConfigs(request, queryParams);
        const response = await petJournalApiClient.get('journal-entry', config);
        logger.info(response,"fetch journal entries response")
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        logger.error(error,"An error occurred fetching journal entries")
        return handleApiException(error);
    }
}