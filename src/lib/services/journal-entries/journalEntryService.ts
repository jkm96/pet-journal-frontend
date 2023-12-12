import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {CreateJournalEntryRequest, UploadJournalImageRequest} from "@/boundary/interfaces/journal";
import axios from "axios";
import {handleApiException, handleAxiosResponse} from "@/helpers/responseHelpers";

export async function createJournalEntry(createRequest: CreateJournalEntryRequest) {
    try {
        const formData = new FormData();
        formData.append('title', createRequest.title);
        formData.append('event', createRequest.event);
        formData.append('content', createRequest.content);
        formData.append('location', createRequest.location);
        formData.append('mood', createRequest.mood);
        formData.append('tags', createRequest.tags);
        formData.append('petIds', JSON.stringify(createRequest.petIds));

        if (createRequest.attachments) {
            for (let i = 0; i < createRequest.attachments.length; i++) {
                const file = createRequest.attachments[i];
                formData.append(`attachment${i}`, file, file.name);
            }
        }

        const response = await axios.post(`${internalBaseUrl}/journal-entry/create`, formData, {
            headers: {
                'x-api-key': `${apiKey}`,
                "Content-Type": "multipart/form-data",
            }
        });

        return response.data;
    } catch (error: any) {
        return handleApiException(error);
    }
}

export async function uploadJournalAttachments(uploadRequest: UploadJournalImageRequest) {
    try {
        const formData = new FormData();
        formData.append('journalId', `${uploadRequest.journalId}`);

        if (uploadRequest.attachments) {
            for (let i = 0; i < uploadRequest.attachments.length; i++) {
                const file = uploadRequest.attachments[i];
                formData.append(`attachment${i}`, file, file.name);
            }
        }

        const response = await axios.post(`${internalBaseUrl}/journal-entry/attachments/create`, formData, {
            headers: {
                'x-api-key': `${apiKey}`,
                "Content-Type": "multipart/form-data",
            }
        });

        return response.data;
    } catch (error: any) {
        return handleApiException(error);
    }
}

export async function getJournalEntries() {
    try {
        const response = await fetch(`${internalBaseUrl}/journal-entry/list`, {
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

export async function getJournalEntryDetails(journalSlug:string) {
    try {
        const response = await fetch(`${internalBaseUrl}/journal-entry/${journalSlug}`, {
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

export async function getJournalEntryAttachmentBuffers(journalId:number) {
    try {
        const response = await fetch(`${internalBaseUrl}/journal-entry/attachments/${journalId}`, {
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