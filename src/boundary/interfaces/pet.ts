export interface CreatePetRequest {
    name: string;
    nickname: string;
    species: string;
    breed: string;
    description: string;
    dateOfBirth?: string | "";
    profilePicture: FileList | null;
    petTraits?: string[] | null;
}

export interface PetProfileResponse {
    id: number;
    slug: string;
    userId: number;
    name: string;
    nickname: string;
    species: string;
    breed: string;
    description: string;
    dateOfBirth: string | null;
    profileUrl: string;
    createdAt: string;
    updatedAt: string;
    petTraits: PetTraitModel[] | null;
}

export interface PetTraitModel {
    id: number;
    petId: number;
    trait: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}

export interface Trait {
    trait: string;
    type: string;
}

export interface AddPetTraitRequest {
    petId: number;
    traits: Trait[];
}

export interface UpdatePetProfileImageRequest {
    petId: number
    profilePicture: FileList | null;
}