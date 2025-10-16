import { apiClient, handleApiError } from "./api/client";
import { API_ENDPOINTS } from "./api/config";
import type { User } from "../types/user.types";

/**
 * User Service - Handles all user-related API calls
 */
export class UserService {
  /**
   * Fetch all users
   */
  static async fetchAll(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>(API_ENDPOINTS.USERS, {
        params: { limit: 100 },
      });
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch users");
    }
  }

  /**
   * Fetch user by ID
   */
  static async fetchById(userId: string): Promise<User> {
    try {
      const response = await apiClient.get<User>(
        API_ENDPOINTS.USER_BY_ID(userId)
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch user");
    }
  }

  /**
   * Create a new user
   */
  static async create(userData: { username: string }): Promise<User> {
    try {
      const response = await apiClient.post<User>(
        API_ENDPOINTS.USERS,
        userData
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to create user");
    }
  }

  /**
   * Update a user
   */
  static async update(
    userId: string,
    userData: Partial<Omit<User, "id" | "created_at">>
  ): Promise<User> {
    try {
      const response = await apiClient.patch<User>(
        API_ENDPOINTS.USER_BY_ID(userId),
        userData
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to update user");
    }
  }

  /**
   * Delete a user
   */
  static async delete(userId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.USER_BY_ID(userId));
    } catch (error) {
      handleApiError(error, "Failed to delete user");
    }
  }
}

// Export functions for backward compatibility
export const fetchAllUsers = UserService.fetchAll;
export const fetchUserById = UserService.fetchById;
export const createUser = UserService.create;
export const updateUser = UserService.update;
export const deleteUser = UserService.delete;
