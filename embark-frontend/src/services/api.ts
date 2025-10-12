import axios from "axios";
import type { Quest } from "../types/quest.types";
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
