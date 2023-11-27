export interface LoginUserRequest {
    username: string;
    password: string;
}

export interface RegisterUserRequest {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface Permissions {
    Permission:string
}