export type UserRole = "user" | "editor" | "admin";

export type OAuthProvider = "google" | "github";

export type UserRecord = {
  id?: string;
  email: string;
  fullname: string;
  password?: string;
  image?: string;
  role: UserRole;
  provider?: OAuthProvider;
  type?: OAuthProvider;
};

export type LocalUserInput = {
  email: string;
  fullname: string;
  password: string;
  role?: UserRole;
};

export type OAuthUserInput = {
  email: string;
  fullname: string;
  image?: string;
  provider: OAuthProvider;
};