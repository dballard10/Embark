export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface QuestChatRequest {
  message: string;
  chat_history: ChatMessage[];
}

export interface QuestChatResponse {
  response: string;
}
