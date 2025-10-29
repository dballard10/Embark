import api from "./api";
import type { User } from "../types/user.types";

export interface LoginRequest {
  email: string;
}

export interface SignupRequest {
  email: string;
  username: string;
}

/**
 * Login with email (no password required)
 */
export async function login(email: string): Promise<User> {
  const response = await api.post<User>("/auth/login", { email });
  return response.data;
}

/**
 * Sign up a new user
 */
export async function signup(email: string, username: string): Promise<User> {
  const response = await api.post<User>("/auth/signup", {
    email,
    username,
  });
  return response.data;
}
