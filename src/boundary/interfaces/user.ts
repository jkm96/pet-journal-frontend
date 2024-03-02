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
  emailVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
  permissions: number[];
}