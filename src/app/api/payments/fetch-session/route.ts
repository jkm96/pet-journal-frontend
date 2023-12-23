import {NextRequest, NextResponse} from "next/server";
import {CheckoutSessionModel, CreatePaymentRequest} from "@/boundary/interfaces/payment";
import {cookieName} from "@/boundary/constants/appConstants";
import {AccessTokenModel} from "@/boundary/interfaces/token";
import petJournalApiClient from "@/lib/axios/axiosClient";
import {AxiosRequestConfig} from "axios";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        const sessionId = searchParams.get('session_id')
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const sessionData: CheckoutSessionModel = {
            clientSecret: session.client_secret,
            customerEmail: session.customer_details.email,
            sessionStatus: session.status
        }

        console.log("fetch session", session)

        //TODO check if status is complete and set user paid=true update the user object
        const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
        const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${tokenData.token.token}`,
            }
        };

        const sessionDetails:CreatePaymentRequest =  {
            created: session.created,
            customer: session.customer,
            expiresAt: session.expires_at,
            paymentStatus: session.payment_status,
            sessionId: sessionId,
            status: session.status,
            subscription: session.subscription
        }

        const response = await petJournalApiClient
            .post('payment/create', JSON.stringify(sessionDetails),config);

        const tokenResponse = response.data.data;
        console.log("tokenResponse",tokenResponse)
        const cookieRequest: AccessTokenModel = {
            token: tokenResponse.token,
            user: tokenResponse.user
        };

        const data = {
            sessionData,
            cookieRequest
        }

        return NextResponse.json(
            {
                "data": data,
                "message": "Successfully fetched session",
                "statusCode": 200
            },
            {status: 200});;
    } catch (e) {
        return NextResponse.json(
            {error: `An error occurred fetching payment session: ${e}`}, {status: 400}
        )
    }
}