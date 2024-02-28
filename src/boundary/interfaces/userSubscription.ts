export interface UserSubscriptionResponse {
  id: number;
  customerId: string;
  paymentIntentId: string;
  subscriptionPlanId: number;
  invoice: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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