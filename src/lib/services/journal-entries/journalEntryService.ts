import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {CreateJournalEntryRequest} from "@/boundary/interfaces/journal";

export async function createJournalEntry(createRequest:CreateJournalEntryRequest) {
    try {
        const response = await fetch(`${internalBaseUrl}/journal-entry/create`, {
            method: 'POST',
            headers: {
                'x-api-key':`${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(createRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
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

export async function getJournalEntryDetails(journalEntryId:number) {
    try {
        const response = await fetch(`${internalBaseUrl}/journal-entry/${journalEntryId}`, {
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
