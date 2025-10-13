import axios from "axios";
import type { Quest, UserCompletedQuest } from "../types/quest.types";
import type { Item } from "../types/item.types";
import type { User } from "../types/user.types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Quest API calls
export const fetchAllQuests = async (): Promise<Quest[]> => {
  try {
    const response = await api.get<Quest[]>("/quests", {
      params: { limit: 100 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quests:", error);
    throw new Error("Failed to fetch quests");
  }
};

export const fetchActiveQuests = async (
  userId: string
): Promise<UserCompletedQuest[]> => {
  try {
    const response = await api.get<UserCompletedQuest[]>(
      `/users/${userId}/quests/active`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching active quests:", error);
    return [];
  }
};

export const fetchCompletedQuests = async (
  userId: string,
  limit: number = 50
): Promise<UserCompletedQuest[]> => {
  try {
    const response = await api.get<UserCompletedQuest[]>(
      `/users/${userId}/quests/history`,
      {
        params: { limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching completed quests:", error);
    throw new Error("Failed to fetch completed quests");
  }
};

export const startQuest = async (
  userId: string,
  questId: string
): Promise<UserCompletedQuest> => {
  try {
    const response = await api.post<UserCompletedQuest>(
      `/users/${userId}/quests/start`,
      {
        quest_id: questId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error starting quest:", error);
    throw new Error("Failed to start quest");
  }
};

export const completeQuest = async (
  userId: string,
  userQuestId: string
): Promise<UserCompletedQuest> => {
  try {
    console.log("API: Completing quest", { userId, userQuestId });
    const response = await api.post<UserCompletedQuest>(
      `/users/${userId}/quests/${userQuestId}/complete`
    );
    console.log("API: Quest completed successfully", response.data);
    return response.data;
  } catch (error: any) {
    console.error("API Error completing quest:", error);
    console.error("API Error details:", error.response?.data);

    // Provide more detailed error message
    const errorMessage =
      error.response?.data?.detail ||
      error.message ||
      "Failed to complete quest";
    throw new Error(errorMessage);
  }
};

// Item API calls
export const fetchAllItems = async (): Promise<Item[]> => {
  try {
    const response = await api.get<Item[]>("/items", {
      params: { limit: 100 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to fetch items");
  }
};

export const fetchItemById = async (id: string): Promise<Item> => {
  try {
    const response = await api.get<Item>(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching item ${id}:`, error);
    throw new Error("Failed to fetch item");
  }
};

export const fetchUserItems = async (
  userId: string
): Promise<import("../types/item.types").UserItem[]> => {
  try {
    const response = await api.get<import("../types/item.types").UserItem[]>(
      `/users/${userId}/items`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching items for user ${userId}:`, error);
    throw new Error("Failed to fetch user items");
  }
};

export const purchaseItem = async (
  userId: string,
  itemId: string
): Promise<{
  user_item: import("../types/item.types").UserItem;
  new_glory: number;
  item_price: number;
}> => {
  try {
    const response = await api.post(
      `/users/${userId}/items/${itemId}/purchase`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error purchasing item ${itemId}:`, error);
    const errorMessage =
      error.response?.data?.detail ||
      error.message ||
      "Failed to purchase item";
    throw new Error(errorMessage);
  }
};

// User API calls
export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users", {
      params: { limit: 100 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUserById = async (userId: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw new Error("Failed to fetch user");
  }
};

// Quest CRUD operations
export const createQuest = async (
  questData: Omit<Quest, "id" | "created_at">
): Promise<Quest> => {
  try {
    const response = await api.post<Quest>("/quests", questData);
    return response.data;
  } catch (error) {
    console.error("Error creating quest:", error);
    throw new Error("Failed to create quest");
  }
};

export const updateQuest = async (
  questId: string,
  questData: Partial<Omit<Quest, "id" | "created_at">>
): Promise<Quest> => {
  try {
    const response = await api.patch<Quest>(`/quests/${questId}`, questData);
    return response.data;
  } catch (error) {
    console.error(`Error updating quest ${questId}:`, error);
    throw new Error("Failed to update quest");
  }
};

export const deleteQuest = async (questId: string): Promise<void> => {
  try {
    await api.delete(`/quests/${questId}`);
  } catch (error) {
    console.error(`Error deleting quest ${questId}:`, error);
    throw new Error("Failed to delete quest");
  }
};

// Item CRUD operations
export const createItem = async (
  itemData: Omit<Item, "id" | "created_at">
): Promise<Item> => {
  try {
    const response = await api.post<Item>("/items", itemData);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Failed to create item");
  }
};

export const updateItem = async (
  itemId: string,
  itemData: Partial<Omit<Item, "id" | "created_at">>
): Promise<Item> => {
  try {
    const response = await api.patch<Item>(`/items/${itemId}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item ${itemId}:`, error);
    throw new Error("Failed to update item");
  }
};

export const deleteItem = async (itemId: string): Promise<void> => {
  try {
    await api.delete(`/items/${itemId}`);
  } catch (error) {
    console.error(`Error deleting item ${itemId}:`, error);
    throw new Error("Failed to delete item");
  }
};

// User CRUD operations
export const createUser = async (userData: {
  username: string;
}): Promise<User> => {
  try {
    const response = await api.post<User>("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (
  userId: string,
  userData: Partial<Omit<User, "id" | "created_at">>
): Promise<User> => {
  try {
    const response = await api.patch<User>(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw new Error("Failed to delete user");
  }
};

export default api;
