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
    status: string;
}

export interface UserSubscriptionResponse {
    id: number;
    userId: number;
    subscriptionPlanId: number;
    startDate: string;
    endDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    stripeSessionId: string;
    stripeSubscription: string;
    stripeCustomer: string;
    stripeCreated: string;
    stripeExpiresAt: string;
    stripePaymentStatus: string;
    stripeStatus: string;
    invoice: string;
    subscriptionPlan: SubscriptionPlanResponse;
}

export interface SubscriptionPlanResponse {
    id: number;
    name: string;
    description: string;
    price: string;
    billingCycle: string;
    createdAt: string;
    updatedAt: string;
}