export interface User{
    id: number;
    username: string;
    email: string;
    profileUrl: string;
}

export interface UserResponse{
    id: number;
    username: string;
    email: string;
    profileUrl: string | null;
    isEmailVerified: boolean;
    emailVerifiedAt: null;
    createdAt: Date;
    updatedAt: Date;
    permissions : number[];
}