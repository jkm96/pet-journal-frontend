import {NextRequest, NextResponse} from "next/server";
import {CheckoutSessionModel, CreatePaymentRequest} from "@/boundary/interfaces/payment";
import {AccessTokenModel} from "@/boundary/interfaces/token";
import petJournalApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {getJournalQueryParams} from "@/helpers/urlHelpers";

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

        if (session.status === 'complete') {
            const queryParams = getJournalQueryParams(request);
            const config = getAxiosConfigs(request,queryParams);

            const sessionDetails: CreatePaymentRequest = {
                created: session.created,
                customer: session.customer,
                expiresAt: session.expires_at,
                paymentStatus: session.payment_status,
                sessionId: sessionId,
                status: session.status,
                subscription: session.subscription
            }

            const response = await petJournalApiClient
                .post('payment/create', JSON.stringify(sessionDetails), config);

            const tokenResponse = response.data.data;
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
                {status: 200});
        }

        return NextResponse.json(
            {
                "data": sessionData,
                "message": "Successfully fetched session",
                "statusCode": 200
            },
            {status: 200});

    } catch (e) {
        return NextResponse.json(
            {error: `An error occurred fetching payment session: ${e}`}, {status: 400}
        )
    }
}