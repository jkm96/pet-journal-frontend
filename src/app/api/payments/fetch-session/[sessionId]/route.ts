import { NextRequest, NextResponse } from 'next/server';
import { CheckoutSessionModel, CreatePaymentRequest } from '@/boundary/interfaces/payment';
import { AccessTokenModel } from '@/boundary/interfaces/token';
import petJournalApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { cookieName } from '@/boundary/constants/appConstants';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request: NextRequest, { params }: { params: { sessionId: string } }) {
  try {
    const sessionId = params.sessionId;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const sessionData: CheckoutSessionModel = {
      clientSecret: session.client_secret,
      customerEmail: session.customer_details.email,
      sessionStatus: session.status,
    };

    if (session.status === 'complete') {
      const config = getAxiosConfigs(request);

      const sessionDetails: CreatePaymentRequest = {
        created: session.created,
        customer: session.customer,
        expiresAt: session.expires_at,
        paymentIntent: '$-payment_intent',
        paymentStatus: session.payment_status,
        sessionId: sessionId,
        status: session.status,
        subscription: session.subscription,
      };
      const response = await petJournalApiClient
        .post('api/v1/payment/create', JSON.stringify(sessionDetails), config);
      console.log('payment request', response);
      const tokenResponse = response.data.data;
      const cookieRequest: AccessTokenModel = {
        token: tokenResponse.token,
        user: tokenResponse.user,
      };

      const data = {
        sessionData,
        cookieRequest,
      };
      const cookieResponse = NextResponse.json(
        {
          'data': data,
          'message': 'Successfully fetched session',
          'statusCode': 200,
        },
        { status: 200 });

      cookieResponse.cookies.set({
        name: `${cookieName}`,
        value: JSON.stringify(cookieRequest),
        httpOnly: true,
        expires: new Date(cookieRequest.token.expiresAt),
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
      });
      return cookieResponse;
    } else {
      return NextResponse.json(
        {
          'data': sessionData,
          'message': 'Successfully fetched session',
          'statusCode': 200,
        },
        { status: 200 });
    }
  } catch (e) {
    return NextResponse.json(
      { error: `An error occurred fetching payment session: ${e}` }, { status: 400 },
    );
  }
}