import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {UserQueryParameters} from "@/boundary/parameters/userQueryParameters";

export async function getUsers(queryParams: UserQueryParameters) {
    try {
        const queryString = new URLSearchParams(queryParams as Record<string, any>).toString();
        const apiUrl = `${internalBaseUrl}/admin/manage-users/list?${queryString}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function toggleUserStatus(userId: number) {
    try {
        const response = await fetch(`${internalBaseUrl}/users/toggle`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({"userId":userId}),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getUserById(userId: string) {
    try {
        const apiUrl = `${internalBaseUrl}/users/${userId}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}