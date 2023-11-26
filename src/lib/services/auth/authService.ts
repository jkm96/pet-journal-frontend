import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {LoginUserRequest, RegisterUserRequest} from "@/boundary/interfaces/auth";

export async function loginUser(loginRequest: LoginUserRequest) {
    try {
        const response = await fetch(`${internalBaseUrl}/user/auth/login`, {
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

export async function registerUser(registerRequest: RegisterUserRequest) {
    try {
        const response = await fetch(`${internalBaseUrl}/user/auth/register`, {
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
