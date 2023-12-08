export interface JournalEntryResponse {
    id: number;
    title: string;
    event: string;
    content: string;
    profileUrl: string;
    location: string;
    mood: string;
    tags: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateJournalEntryRequest {
    title: string;
    event: string;
    content: string;
    location: string;
    mood: string;
    tags: string;
    petIds: number[]
    attachments: FileList | null;
}