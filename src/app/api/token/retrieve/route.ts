import {NextRequest} from "next/server";
import {cookieName} from "@/boundary/constants/appConstants";
import {createNextResponse} from "@/helpers/responseHelpers";

export async function POST(request: NextRequest) {
    try {
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        if (tokenCookie === undefined) {
            return createNextResponse(422, "Cookie was empty")
        }

        return createNextResponse(200, "Success", tokenCookie)

    } catch (e) {
        return createNextResponse(400, `An error occurred getting cookie: ${e}`)
    }
}