export interface CheckoutSessionModel {
    clientSecret: string;
    sessionStatus: any;
    customerEmail: string;
}

export interface CreatePaymentRequest {
    sessionId: string | null;
    subscription: string;
    customer: string;
    created: any;
    expiresAt: any;
    paymentStatus: string;
    paymentIntent: string;
    status: string;
}