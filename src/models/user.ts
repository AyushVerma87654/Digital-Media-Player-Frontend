export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthCompletedResponse = {
  accessToken: string;
  user: User;
};

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
