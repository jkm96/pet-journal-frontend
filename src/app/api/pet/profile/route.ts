import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const onlyPino = require('pino')()
        const config = getAxiosConfigs(request);
        const response = await petJournalApiClient.get('pet/profiles', config);
        onlyPino.info(response,"pet profiles response")
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}