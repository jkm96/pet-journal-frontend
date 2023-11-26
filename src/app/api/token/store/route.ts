import {NextRequest, NextResponse} from "next/server";
import {cookieName} from "@/boundary/constants/appConstants";

export async function POST(request: NextRequest) {
    try {
        const tokenRequest = await request.text();
        const response = NextResponse.json(
            {
                "data":"",
                "message":"Success",
                "statusCode":200
            },
            {status: 200});

        response.cookies.set({
            name: `${cookieName}`,
            value: tokenRequest,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
        });

        return response;
    } catch (e) {
        return NextResponse.json(
            {error: `An error occurred storing cookie: ${e}`}, {status: 400}
        )
    }
}