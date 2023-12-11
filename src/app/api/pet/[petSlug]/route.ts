import {handleAxiosResponse, handleApiException} from "@/helpers/responseHelpers";
import petJournalApiClient from "@/lib/axios/axiosClient";
import {NextRequest} from "next/server";
import {AxiosRequestConfig} from "axios";
import {cookieName} from "@/boundary/constants/appConstants";
import {AccessTokenModel} from "@/boundary/interfaces/token";

export async function GET(request: NextRequest,{params}: { params: { petSlug: string } }) {
    try {
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
        const petSlug = params.petSlug;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${tokenData.token.token}`
            }
        };

        const response = await petJournalApiClient.get(`pet/${petSlug}/profile`, config);
        console.log("petmngt profile api response", response.data)

        return handleAxiosResponse(response);
    } catch (error: unknown) {
        return handleApiException(error);
    }
}