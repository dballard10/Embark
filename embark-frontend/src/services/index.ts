/**
 * Central export for all services
 */

// Export services as classes
export { QuestService } from "./questService";
export { ItemService } from "./itemService";
export { UserService } from "./userService";

// Export individual functions for convenience
export {
  fetchAllQuests,
  fetchActiveQuests,
  fetchCompletedQuests,
  startQuest,
  completeQuest,
  abandonQuest,
  createQuest,
  updateQuest,
  deleteQuest,
} from "./questService";

export {
  fetchAllItems,
  fetchItemById,
  fetchUserItems,
  purchaseItem,
  createItem,
  updateItem,
  deleteItem,
} from "./itemService";

export {
  fetchAllUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./userService";

// Export API client and config
export { apiClient } from "./api/client";
export { API_CONFIG, API_ENDPOINTS } from "./api/config";
export type { ApiResponse, ApiError, PaginatedResponse } from "./api/types";
