export interface User{
    id: number;
    name: string;
    email: string;
    authToken: string;
    isAdmin: boolean;
    emailVerifiedAt: null,
    createdAt: Date,
    updatedAt: Date
}

export interface UserPermissions {
    permissions: string[];
}
