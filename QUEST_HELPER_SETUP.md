# Quest Helper ChatGPT Integration - Setup Guide

## Overview

The Quest Helper feature has been successfully integrated into Embark! This AI-powered assistant helps users complete their active quests by providing guidance and tips specific to each quest's topic.

## What Was Implemented

### Backend Changes

1. **Added OpenAI dependency** (`pyproject.toml`)

   - Added `openai>=1.0.0` package

2. **Configuration** (`config/settings.py`)

   - Added `OPENAI_API_KEY` setting

3. **Chat Models** (`models/quest.py`)

   - `ChatMessage` - Individual chat messages (user/assistant)
   - `QuestChatRequest` - Request format with message and history
   - `QuestChatResponse` - Response format

4. **Quest Helper Service** (`services/quest_helper_service.py`)

   - `QuestHelperService` class with ChatGPT integration
   - Smart system prompt that restricts AI to quest topic only
   - Handles API errors and provides fallback responses

5. **API Endpoint** (`routers/quests.py`)
   - POST `/users/{user_id}/quests/{user_quest_id}/chat`
   - Validates active quests
   - Returns AI-generated responses

### Frontend Changes

1. **TypeScript Types** (`types/chat.types.ts`)

   - Chat message interfaces
   - Request/response types

2. **API Service** (`services/api/questChatService.ts`)

   - `sendQuestChatMessage()` function
   - Integrated with main API exports

3. **Chat Modal Component** (`components/common/QuestHelperChatModal.tsx`)

   - Beautiful chat interface
   - User messages (right-aligned, blue)
   - AI messages (left-aligned, purple/slate)
   - Loading indicators
   - Auto-scroll to latest message
   - Keyboard shortcuts (Enter to send, Shift+Enter for new line)

4. **Quest Details Integration** (`components/common/QuestDetailsView.tsx`)
   - "Learn how to complete" button next to time remaining
   - Opens chat modal on click
   - Responsive button text (shorter on mobile)

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd embark-backend
uv sync
```

### 2. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in to your OpenAI account
3. Create a new API key
4. Copy the key (starts with `sk-`)

### 3. Configure Environment

Add to your `.env` file in `embark-backend/`:

```env
OPENAI_API_KEY=sk-your-api-key-here
```

### 4. Restart Backend Server

```bash
cd embark-backend
uv run fastapi dev main.py
```

### 5. Test the Frontend

The frontend doesn't need any new dependencies installed. Just ensure it's running:

```bash
cd embark-frontend
npm run dev
```

## How It Works

### AI Topic Restriction

The Quest Helper uses a sophisticated system prompt that:

1. **Restricts responses** to the specific quest topic only
2. **Redirects off-topic questions** politely back to the quest topic
3. **Provides guidance** without giving complete step-by-step solutions
4. **Stays in character** as a quest guide using gaming terminology
5. **Encourages learning** and independent application

Example: If a quest is about "Rubik's Cube Solving" and a user asks "How do I make pancakes?", the AI will politely redirect them back to Rubik's Cube topics.

### User Experience

1. User starts an active quest
2. On Quest Details page, clicks "Learn how to complete" button
3. Chat modal opens with AI greeting
4. User asks questions about the quest topic
5. AI provides helpful guidance and tips
6. Chat history is maintained during the session
7. History resets when modal is closed

## Features

- ✅ Topic-restricted AI responses
- ✅ Chat history within session
- ✅ Loading indicators
- ✅ Error handling
- ✅ Responsive design
- ✅ Keyboard shortcuts
- ✅ Auto-scroll to latest message
- ✅ Beautiful UI matching game aesthetic

## Testing Recommendations

1. **On-topic questions**: Ask about the quest topic (should get helpful responses)
2. **Off-topic questions**: Ask about unrelated topics (should be redirected)
3. **Edge cases**: Empty messages, very long messages
4. **Error handling**: Test with invalid API key, network issues
5. **UI/UX**: Test on mobile and desktop sizes

## Cost Considerations

- Using `gpt-4o-mini` model (cost-effective)
- Max 500 tokens per response (keeps costs low)
- Typical cost: ~$0.001-0.002 per conversation

## Troubleshooting

### "Failed to get chat response"

- Check that `OPENAI_API_KEY` is set correctly in `.env`
- Verify OpenAI API key is valid and has credits
- Check backend logs for detailed error messages

### Button doesn't appear

- Button only shows for active quests (with `showStartedInfo=true`)
- Check that quest has been started (has `deadline_at`)

### AI gives off-topic responses

- This shouldn't happen with the current system prompt
- If it does, check the quest topic is set correctly

## Files Modified/Created

### Backend

- ✅ `embark-backend/pyproject.toml` - Added OpenAI dependency
- ✅ `embark-backend/config/settings.py` - Added OPENAI_API_KEY setting
- ✅ `embark-backend/models/quest.py` - Added chat models
- ✅ `embark-backend/services/quest_helper_service.py` - NEW service
- ✅ `embark-backend/routers/quests.py` - Added chat endpoint

### Frontend

- ✅ `embark-frontend/src/types/chat.types.ts` - NEW types
- ✅ `embark-frontend/src/services/api/questChatService.ts` - NEW service
- ✅ `embark-frontend/src/components/common/QuestHelperChatModal.tsx` - NEW component
- ✅ `embark-frontend/src/components/common/QuestDetailsView.tsx` - Added button & modal
- ✅ `embark-frontend/src/pages/QuestDetailsPage.tsx` - Pass userId prop
- ✅ `embark-frontend/src/services/api.ts` - Export chat service

## Next Steps

1. Get OpenAI API key and add to `.env`
2. Restart backend server
3. Start a quest and test the chat feature
4. Try both on-topic and off-topic questions to verify restrictions work
5. Monitor usage and costs in OpenAI dashboard

Enjoy your new AI-powered quest helper! 🎮✨
