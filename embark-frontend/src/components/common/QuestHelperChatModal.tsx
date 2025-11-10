import { useState, useEffect, useRef } from "react";
import {
  IconSend,
  IconSparkles,
  IconUser,
  IconRobot,
} from "@tabler/icons-react";
import { Modal } from "../ui/Modal";
import { sendQuestChatMessage } from "../../services/api/questChatService";
import type { ChatMessage } from "../../types/chat.types";
import type { Quest } from "../../types/quest.types";

interface QuestHelperChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  quest: Quest;
  userId: string;
  userQuestId: string;
}

function QuestHelperChatModal({
  isOpen,
  onClose,
  quest,
  userId,
  userQuestId,
}: QuestHelperChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add initial greeting when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hello, adventurer! I'm here to help you conquer the **${quest.enemy_name}** and master **${quest.topic}**. What would you like to know?`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [isOpen, quest, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setError(null);
    setIsLoading(true);

    try {
      // Send message to API
      const response = await sendQuestChatMessage(
        userId,
        userQuestId,
        inputMessage,
        messages
      );

      // Add assistant response
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(
        "Failed to get a response. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <IconSparkles size={28} className="text-purple-400" stroke={2} />
          <div>
            <h2 className="text-2xl font-bold text-white">Quest Helper</h2>
            <p className="text-sm text-gray-300">
              Get guidance on:{" "}
              <span className="font-semibold">{quest.topic}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === "user" ? "bg-blue-600" : "bg-purple-600"
                  }`}
                >
                  {message.role === "user" ? (
                    <IconUser size={20} className="text-white" />
                  ) : (
                    <IconRobot size={20} className="text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : "bg-gradient-to-r from-slate-700 to-slate-800 text-gray-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-purple-600">
                  <IconRobot size={20} className="text-white" />
                </div>
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 py-2">
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg px-4 py-2 text-red-300 text-sm">
              {error}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-slate-700 p-4 bg-slate-800/50">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about completing this quest..."
              className="flex-1 bg-slate-900 text-white rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:border-purple-500 resize-none"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <IconSend size={20} />
              Send
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default QuestHelperChatModal;
