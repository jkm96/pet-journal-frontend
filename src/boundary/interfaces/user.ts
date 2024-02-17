export interface User {
    id: number;
    username: string;
    email: string;
    profileUrl: string;
    profileCoverUrl: string;
    isEmailVerified: boolean;
    isSubscribed: boolean;
    isAdmin: boolean;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    profileUrl: string | null;
    profileCoverUrl: string | null;
    isEmailVerified: boolean;
    isSubscribed: boolean;
    isAdmin: boolean;
    isActive: boolean;
    emailVerifiedAt: null;
    createdAt: Date;
    updatedAt: Date;
    permissions: number[];
}