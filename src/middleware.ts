import {NextRequest, NextResponse} from "next/server";
import {apiKey, cookieName, internalBaseUrl} from "@/boundary/constants/appConstants";
import {getAccessToken} from "@/lib/services/token/tokenService";

export async function middleware(request: NextRequest) {
    if (request.url.includes('/api/')) {
        const clientApiKey = request.headers.get("x-api-key");
        if (clientApiKey !== apiKey) {
            return NextResponse.json("Unauthorized access");
        }
    }

    if (request.url.includes(`${internalBaseUrl}`)) {
        let response = await getAccessToken()
        if (response.statusCode === 200) {
            const tokenResponse = response.data;
            if (tokenResponse) {
                let response = NextResponse.next();
                response.cookies.set({
                    name: `${cookieName}`,
                    value: JSON.stringify(tokenResponse),
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "strict",
                    path: "/",
                });

                return response;
            }
        }
    }

    return NextResponse.next();
}