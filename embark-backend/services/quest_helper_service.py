"""
Quest Helper Service for ChatGPT-powered quest assistance
"""
from typing import List
from openai import OpenAI, OpenAIError
from config.settings import settings
from models.quest import ChatMessage, QuestResponse


class QuestHelperService:
    """Service for providing quest assistance using ChatGPT"""
    
    def __init__(self):
        """Initialize the OpenAI client"""
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = "gpt-4o-mini"  # Using cost-effective model
    
    def _build_system_prompt(self, quest: QuestResponse) -> str:
        """
        Build a system prompt that restricts the AI to quest-specific topics
        
        Args:
            quest: The quest object containing context
            
        Returns:
            System prompt string
        """
        return f"""You are a helpful quest guide in a gamified life improvement app called Embark. Your role is to help users complete their active quest by providing guidance, tips, and encouragement.

Quest Context:
- Title: {quest.title}
- Description: {quest.description}
- Topic: {quest.topic}
- Enemy: {quest.enemy_name} ({quest.enemy_type})
- Challenge: {quest.enemy_description}

STRICT RULES YOU MUST FOLLOW:

1. TOPIC RESTRICTION: Only answer questions related to "{quest.topic}". This is the core topic of the quest.

2. OFF-TOPIC HANDLING: If the user asks about anything unrelated to {quest.topic}, politely redirect them:
   - Acknowledge their question
   - Explain you can only help with {quest.topic}
   - Encourage them to ask relevant questions
   - Example: "I appreciate your question about [other topic], but I'm here specifically to help you with {quest.topic} for this quest. What would you like to know about {quest.topic}?"

3. GUIDANCE STYLE:
   - Provide helpful tips and strategies
   - Don't give complete step-by-step solutions
   - Encourage independent learning and application
   - Be motivating and supportive
   - Keep responses concise (2-3 paragraphs max)

4. STAY IN CHARACTER:
   - You're a quest guide, not a general assistant
   - Frame advice in the context of "defeating the {quest.enemy_name}"
   - Use occasional gaming/quest terminology
   - Be enthusiastic about their progress

5. SAFETY:
   - If asked to do anything harmful, unethical, or inappropriate, politely decline
   - Focus on legitimate learning and skill development

Remember: Your ONLY job is to help with {quest.topic}. Be strict about this restriction."""

    async def get_chat_response(
        self,
        quest: QuestResponse,
        user_message: str,
        chat_history: List[ChatMessage]
    ) -> str:
        """
        Get a chat response from ChatGPT based on quest context
        
        Args:
            quest: The quest object for context
            user_message: The user's message
            chat_history: Previous chat messages
            
        Returns:
            AI assistant's response
            
        Raises:
            Exception: If OpenAI API call fails
        """
        try:
            # Build system prompt with quest context
            system_prompt = self._build_system_prompt(quest)
            
            # Build messages array
            messages = [
                {"role": "system", "content": system_prompt}
            ]
            
            # Add chat history
            for msg in chat_history:
                messages.append({
                    "role": msg.role,
                    "content": msg.content
                })
            
            # Add current user message
            messages.append({
                "role": "user",
                "content": user_message
            })
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=500,  # Keep responses concise
                temperature=0.7,  # Balanced creativity
            )
            
            # Extract response
            assistant_message = response.choices[0].message.content
            
            return assistant_message or "I apologize, but I couldn't generate a response. Please try asking your question again."
            
        except OpenAIError as e:
            raise Exception(f"OpenAI API error: {str(e)}")
        except Exception as e:
            raise Exception(f"Failed to get chat response: {str(e)}")

