import { apiClient, handleApiError } from "./api/client";
import { API_ENDPOINTS } from "./api/config";
import type { Quest, UserCompletedQuest } from "../types/quest.types";
import type { QuestQueryParams } from "./api/types";

/**
 * Quest Service - Handles all quest-related API calls
 */
export class QuestService {
  /**
   * Fetch all available quests
   */
  static async fetchAll(params?: QuestQueryParams): Promise<Quest[]> {
    try {
      const response = await apiClient.get<Quest[]>(API_ENDPOINTS.QUESTS, {
        params: { limit: 100, ...params },
      });
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch quests");
    }
  }

  /**
   * Fetch quest by ID
   */
  static async fetchById(id: string): Promise<Quest> {
    try {
      const response = await apiClient.get<Quest>(
        API_ENDPOINTS.QUEST_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch quest");
    }
  }

  /**
   * Fetch user's active quests
   */
  static async fetchActiveQuests(
    userId: string
  ): Promise<UserCompletedQuest[]> {
    try {
      const response = await apiClient.get<UserCompletedQuest[]>(
        API_ENDPOINTS.USER_ACTIVE_QUESTS(userId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active quests:", error);
      return [];
    }
  }

  /**
   * Fetch user's completed quest history
   */
  static async fetchQuestHistory(
    userId: string,
    limit = 50
  ): Promise<UserCompletedQuest[]> {
    try {
      const response = await apiClient.get<UserCompletedQuest[]>(
        API_ENDPOINTS.USER_QUEST_HISTORY(userId),
        { params: { limit } }
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch quest history");
    }
  }

  /**
   * Start a quest for a user
   */
  static async start(
    userId: string,
    questId: string
  ): Promise<UserCompletedQuest> {
    try {
      const response = await apiClient.post<UserCompletedQuest>(
        API_ENDPOINTS.START_QUEST(userId),
        { quest_id: questId }
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to start quest");
    }
  }

  /**
   * Complete a quest
   */
  static async complete(
    userId: string,
    userQuestId: string
  ): Promise<UserCompletedQuest> {
    try {
      console.log("QuestService: Completing quest", { userId, userQuestId });
      const response = await apiClient.post<UserCompletedQuest>(
        API_ENDPOINTS.COMPLETE_QUEST(userId, userQuestId)
      );
      console.log("QuestService: Quest completed successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("QuestService: Error completing quest:", error);
      handleApiError(error, "Failed to complete quest");
    }
  }

  /**
   * Abandon a quest
   */
  static async abandon(userId: string, userQuestId: string): Promise<void> {
    try {
      console.log("QuestService: Abandoning quest", { userId, userQuestId });
      await apiClient.delete(API_ENDPOINTS.ABANDON_QUEST(userId, userQuestId));
      console.log("QuestService: Quest abandoned successfully");
    } catch (error) {
      console.error("QuestService: Error abandoning quest:", error);
      handleApiError(error, "Failed to abandon quest");
    }
  }

  /**
   * Create a new quest (admin)
   */
  static async create(
    questData: Omit<Quest, "id" | "created_at">
  ): Promise<Quest> {
    try {
      const response = await apiClient.post<Quest>(
        API_ENDPOINTS.QUESTS,
        questData
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to create quest");
    }
  }

  /**
   * Update a quest (admin)
   */
  static async update(
    questId: string,
    questData: Partial<Omit<Quest, "id" | "created_at">>
  ): Promise<Quest> {
    try {
      const response = await apiClient.patch<Quest>(
        API_ENDPOINTS.QUEST_BY_ID(questId),
        questData
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to update quest");
    }
  }

  /**
   * Delete a quest (admin)
   */
  static async delete(questId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.QUEST_BY_ID(questId));
    } catch (error) {
      handleApiError(error, "Failed to delete quest");
    }
  }
}

// Export functions for backward compatibility
export const fetchAllQuests = QuestService.fetchAll;
export const fetchActiveQuests = QuestService.fetchActiveQuests;
export const fetchCompletedQuests = QuestService.fetchQuestHistory;
export const startQuest = QuestService.start;
export const completeQuest = QuestService.complete;
export const abandonQuest = QuestService.abandon;
export const createQuest = QuestService.create;
export const updateQuest = QuestService.update;
export const deleteQuest = QuestService.delete;
