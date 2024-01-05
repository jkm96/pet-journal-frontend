import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";

export async function createCheckoutSession() {
    try {
        const response = await fetch(`${internalBaseUrl}/payments/checkout-session`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function fetchCheckoutSession(sessionId: string) {
    try {
        const response = await fetch(`${internalBaseUrl}/payments/fetch-session?session_id=${sessionId}`, {
            method: 'GET',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}