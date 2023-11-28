import {User, UserResponse} from "@/boundary/interfaces/user";

export interface StoreTokenRequest{
    accessToken:string;
    user : UserResponse;
    permissions : number[];
}

export interface RefreshTokenRequest {
    token: string;
    refreshToken: string;
}

export interface TokenResponse {
    token: string;
    user : UserResponse;
}