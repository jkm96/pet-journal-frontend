"use client";
import React, {useEffect, useState} from "react";
import {User} from "@/boundary/interfaces/user";
import AuthContext from "./authContext";
import {StoreTokenRequest, TokenResponse} from "@/boundary/interfaces/token";
import {deleteAccessToken, getAccessToken, storeAccessTokenInCookie} from "@/lib/services/token/tokenService";
import {getUserDetails} from "@/lib/jwt/readAuthToken";

type AuthContextProps = {
    children: React.ReactNode;
};

export function AuthProvider({children}: AuthContextProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Add the loading state

    const storeAuthToken = async (tokenData: TokenResponse) => {
        // Store the authentication token in browser cookies or local storage
        const cookieRequest: StoreTokenRequest = {
            storeToken: false,
            accessToken: tokenData.token,
            expiresAt: tokenData.expiresAt,
            refreshToken: tokenData.refreshToken
        };

        await storeAccessTokenInCookie(cookieRequest);
        const userData = getUserDetails(tokenData.token);
        setUser(userData);
    };

    const clearAuthToken = async () => {
        // Perform logout logic and unset the user
        // Remove the authentication token from browser cookies or local storage
        setUser(null);
    };

    useEffect(() => {
        // Check for the authentication token on page load and set the user accordingly
        // Fetch user data based on the token, then set the user
        const fetchAccessToken = async () => {
            const response = await getAccessToken();
            if (response.statusCode === 200){
                const tokenResponse = response.data;
                const { accessToken } = tokenResponse;
                const userData = getUserDetails(accessToken);
                setUser(userData);
            }else{
                setUser(null)
            }
            setLoading(false)
        }

        fetchAccessToken().catch(error => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    return (
        <AuthContext.Provider value={{user, loading,storeAuthToken, clearAuthToken}}>
            {children}
        </AuthContext.Provider>
    );
}
