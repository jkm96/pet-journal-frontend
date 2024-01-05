import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {getJournalQueryParams} from "@/helpers/urlHelpers";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
    try {
        const rootDirectory = process.cwd();
        const filePath = path.join(rootDirectory, 'log-file.txt');

        const queryParams = getJournalQueryParams(request);
        const config = getAxiosConfigs(request, queryParams);
        const response = await petJournalApiClient.get('journal-entry', config);

        fs.appendFile(filePath, JSON.stringify(response.data) + '\n', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
            }
        });
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}