import {PetProfileResponse} from "@/boundary/interfaces/pet";

export interface JournalEntryResponse {
    id: number;
    slug: string;
    title: string;
    event: string;
    content: string;
    profileUrl: string;
    location: string;
    mood: string;
    tags: string;
    createdAt: string;
    updatedAt: string;
    pets:PetProfileResponse[];
    journalAttachments: JournalAttachment[];
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

export interface JournalAttachment {
    id: number;
    type: string;
    sourceUrl: string;
    createdAt: string;
    updatedAt: string;
    journalEntryId: number;
}

export interface PrintJournalEntryRequest {
    id:number;
    title: string;
    slug: string;
    event: string;
    content: string;
    location: string;
    moods: string[];
    tags: string[];
    createdAt: string;
    pets:string[];
    journalAttachments: string[];
}

export interface JournalImageBuffer{
    imageBuffer:string;
    imageType:string;
}