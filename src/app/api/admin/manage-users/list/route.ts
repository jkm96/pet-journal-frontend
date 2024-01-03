import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";
import adminApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {getUserQueryParams} from "@/helpers/urlHelpers";

export async function GET(request: NextRequest) {
    try {
        const queryParams = getUserQueryParams(request);
        console.log("user query params", queryParams)
        const config = getAxiosConfigs(request,queryParams);
        const response = await adminApiClient.get('admin/user', config);
        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}