'use client';
import React, { useEffect, useState } from 'react';
import { User } from '@/boundary/interfaces/user';
import AuthContext from './authContext';
import { AccessTokenModel } from '@/boundary/interfaces/token';
import { getAccessToken, storeAccessTokenInCookie } from '@/lib/services/token/tokenService';

type AuthContextProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const storeAuthToken = async (tokenData: AccessTokenModel):Promise<boolean> => {
    try {
      const cookieRequest: AccessTokenModel = {
        token: tokenData.token,
        user: tokenData.user,
      };

      const response = await storeAccessTokenInCookie(cookieRequest);
      if (response.statusCode == 200) {
        const userObject: User = {
          id: tokenData.user.id,
          username: tokenData.user.username,
          email: tokenData.user.email,
          isEmailVerified: tokenData.user.isEmailVerified,
          isSubscribed: tokenData.user.isSubscribed,
          isAdmin: tokenData.user.isAdmin,
          profileUrl: tokenData.user.profileUrl ?? '',
          profileCoverUrl: tokenData.user.profileCoverUrl ?? '',
        };
        setUser(userObject);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      setLoading(false);
      console.error('Error storing token:', error);
      return false;
    }
  };

  const clearAuthToken = async () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await getAccessToken();
      if (response.statusCode === 200) {
        const tokenResponse = JSON.parse(response.data);
        setUser(tokenResponse.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchAccessToken().catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, storeAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
