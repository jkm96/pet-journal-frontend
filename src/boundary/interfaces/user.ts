export interface User {
    id: number;
    username: string;
    email: string;
    profileUrl: string;
    isEmailVerified: boolean;
    isSubscribed: boolean;
    isAdmin: boolean;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    profileUrl: string | null;
    isEmailVerified: boolean;
    isSubscribed: boolean;
    isAdmin: boolean;
    isActive: boolean;
    emailVerifiedAt: null;
    createdAt: Date;
    updatedAt: Date;
    permissions: number[];
}