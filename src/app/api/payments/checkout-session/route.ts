import {NextRequest, NextResponse} from "next/server";
import {CheckoutSessionModel} from "@/boundary/interfaces/payment";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: process.env.STRIPE_PRODUCT_PRICE,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            return_url: `${request.nextUrl.origin}${NAVIGATION_LINKS.CHECKOUT_RETURN}?session_id={CHECKOUT_SESSION_ID}`,
        });

        const data: CheckoutSessionModel = {
            clientSecret: session.client_secret,
            customerEmail: "",
            sessionStatus: ""
        }

        return NextResponse.json(
            {
                "data": data,
                "message": "Session successfully generated",
                "statusCode": 200
            },
            {status: 200});
    } catch (e) {
        return NextResponse.json(
            {error: `An error occurred storing cookie: ${e}`}, {status: 400}
        )
    }
}