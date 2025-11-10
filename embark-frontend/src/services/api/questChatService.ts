import apiClient from "../api";
import type {
  ChatMessage,
  QuestChatRequest,
  QuestChatResponse,
} from "../../types/chat.types";

/**
 * Send a chat message to the quest helper AI
 */
export async function sendQuestChatMessage(
  userId: string,
  userQuestId: string,
  message: string,
  chatHistory: ChatMessage[]
): Promise<QuestChatResponse> {
  const requestData: QuestChatRequest = {
    message,
    chat_history: chatHistory,
  };

  const response = await apiClient.post<QuestChatResponse>(
    `/users/${userId}/quests/${userQuestId}/chat`,
    requestData
  );

  return response.data;
}
