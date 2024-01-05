import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {AddPetTraitRequest, CreatePetRequest} from "@/boundary/interfaces/pet";
import axios from "axios";

export async function getPetProfiles() {
    try {
        const response = await fetch(`${internalBaseUrl}/pet/profile`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            credentials: 'include',
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function createPetProfile(createRequest: CreatePetRequest) {
    try {
        const formData = new FormData();
        formData.append('name', createRequest.name);
        formData.append('nickname', createRequest.nickname);
        formData.append('species', createRequest.species);
        formData.append('breed', createRequest.breed);
        formData.append('description', createRequest.description);
        formData.append('dateOfBirth', createRequest.dateOfBirth ?? '');
        formData.append('petTraits', JSON.stringify(createRequest.petTraits));

        console.log("createRequest", createRequest.petTraits)
        if (createRequest.profilePicture) {
            for (let i = 0; i < createRequest.profilePicture.length; i++) {
                const file = createRequest.profilePicture[i];
                formData.append('profilePicture', file, file.name);
            }
        }

        const response = await axios.post(`${internalBaseUrl}/pet/create`, formData, {
            headers: {
                'x-api-key': `${apiKey}`,
                "Content-Type": "multipart/form-data",
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getPetProfileDetails(petSlug: string) {
    try {
        const response = await fetch(`${internalBaseUrl}/pet/${petSlug}`, {
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

export async function addPetTraits(addRequest: AddPetTraitRequest) {
    try {
        const response = await fetch(`${internalBaseUrl}/pet/trait/create`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(addRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}
