/**
 * API Configuration
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    "Content-Type": "application/json",
  },
  RETRY: {
    ATTEMPTS: 3,
    DELAY: 1000, // 1 second
  },
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Quest endpoints
  QUESTS: "/quests",
  QUEST_BY_ID: (id: string) => `/quests/${id}`,
  USER_ACTIVE_QUESTS: (userId: string) => `/users/${userId}/quests/active`,
  USER_QUEST_HISTORY: (userId: string) => `/users/${userId}/quests/history`,
  START_QUEST: (userId: string) => `/users/${userId}/quests/start`,
  COMPLETE_QUEST: (userId: string, questId: string) =>
    `/users/${userId}/quests/${questId}/complete`,
  ABANDON_QUEST: (userId: string, questId: string) =>
    `/users/${userId}/quests/${questId}/abandon`,

  // Item endpoints
  ITEMS: "/items",
  ITEM_BY_ID: (id: string) => `/items/${id}`,
  USER_ITEMS: (userId: string) => `/users/${userId}/items`,
  PURCHASE_ITEM: (userId: string, itemId: string) =>
    `/users/${userId}/items/${itemId}/purchase`,

  // User endpoints
  USERS: "/users",
  USER_BY_ID: (id: string) => `/users/${id}`,
} as const;
