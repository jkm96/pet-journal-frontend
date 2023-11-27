import {User} from "@/boundary/interfaces/user";

export interface StoreTokenRequest{
    accessToken:string;
    user : User;
    permissions : number[];
}

export interface RefreshTokenRequest {
    token: string;
    refreshToken: string;
}

export interface TokenResponse {
    token: string;
    user : User;
    permissions : number[];
}