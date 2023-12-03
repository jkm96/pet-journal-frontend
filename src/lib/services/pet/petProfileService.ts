import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";

export async function getPetProfiles() {
    try {
        const response = await fetch(`${internalBaseUrl}/pet/profile`, {
            method: 'GET',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getPetProfileDetails(petId:number) {
    try {
        const response = await fetch(`${internalBaseUrl}/pet/${petId}`, {
            method: 'GET',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}
