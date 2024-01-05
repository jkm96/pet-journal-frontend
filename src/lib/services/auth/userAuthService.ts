import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {LoginUserRequest, RegisterUserRequest} from "@/boundary/interfaces/auth";

export async function loginUser(loginRequest: LoginUserRequest) {
    try {
        const response = await fetch(`${internalBaseUrl}/auth/user/login`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function verifyUserEmailAsync(token: String) {
    try {
        const response = await fetch(`${internalBaseUrl}/auth/user/verify-user`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({"token": token}),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function registerUser(registerRequest: RegisterUserRequest) {
    try {
        const response = await fetch(`${internalBaseUrl}/auth/user/register`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(registerRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}
