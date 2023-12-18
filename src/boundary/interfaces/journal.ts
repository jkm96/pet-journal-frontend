import {PetProfileResponse} from "@/boundary/interfaces/pet";
import UploadJournalImagesModal
    from "@/components/dashboard/journalmngt/journalentries/modals/UploadJournalImagesModal";

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

export interface UpdateJournalEntryRequest {
    journalId: number;
    title: string;
    event: string;
    content: string;
    location: string;
    mood: string;
    tags: string;
    petIds: number[]
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

export interface UploadJournalImageRequest{
    journalId: number
    attachments: FileList | null;
}

export interface MyJournalOverviewProps {
    searchParams?: { searchTerm?: string; periodFrom?: string; periodTo?: string; };
}