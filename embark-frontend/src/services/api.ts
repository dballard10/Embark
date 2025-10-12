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
): Promise<UserCompletedQuest | null> => {
  try {
    const response = await api.get<UserCompletedQuest>(
      `/users/${userId}/quests/active`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching active quests:", error);
    return null;
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

export default api;
