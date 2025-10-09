# API Endpoints Documentation

This document defines all REST API endpoints for the Embark backend.

---

## API Base URL

```
Development: http://localhost:8000/api/v1
Production:  https://api.lifegamifier.com/v1
```

---

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

**Token Lifetime**: 7 days  
**Refresh Strategy**: Automatic refresh before expiration

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2025-10-08T12:00:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  },
  "timestamp": "2025-10-08T12:00:00Z"
}
```

### HTTP Status Codes

- `200 OK`: Successful GET/PATCH
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing/invalid auth token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Resource conflict (e.g., duplicate)
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

---

## 🧩 MVP Endpoints

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request Body**:

```json
{
  "email": "user@example.com",
  "username": "adventurer123",
  "password": "SecurePassword123!",
  "location": "San Francisco, CA" // optional
}
```

**Response** (201):

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "adventurer123",
      "location": "San Francisco, CA",
      "totalPoints": 0,
      "level": 1,
      "createdAt": "2025-10-08T12:00:00Z"
    },
    "accessToken": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  },
  "message": "Registration successful"
}
```

**Validation Rules**:

- Email: Valid email format
- Username: 3-50 characters, alphanumeric + underscores
- Password: Min 8 characters, 1 uppercase, 1 lowercase, 1 number

**Error Codes**:

- `USERNAME_TAKEN`: Username already exists
- `EMAIL_TAKEN`: Email already registered
- `INVALID_INPUT`: Validation failed

---

### POST /auth/login

Authenticate an existing user.

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  },
  "message": "Login successful"
}
```

**Error Codes**:

- `INVALID_CREDENTIALS`: Wrong email/password
- `USER_NOT_FOUND`: Email not registered

---

### POST /auth/refresh

Refresh an expired access token.

**Request Body**:

```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token"
  }
}
```

---

### POST /auth/logout

Invalidate user session (optional in MVP).

**Headers**: `Authorization: Bearer <token>`

**Response** (204): No content

---

## User Endpoints

### GET /users/me

Get current user's profile.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "adventurer123",
      "location": "San Francisco, CA",
      "totalPoints": 45000,
      "level": 4,
      "pointsToNextLevel": 5000,
      "avatarUrl": null,
      "createdAt": "2025-10-01T12:00:00Z",
      "updatedAt": "2025-10-08T12:00:00Z"
    },
    "stats": {
      "totalItems": 12,
      "totalChallengesCompleted": 15,
      "currentStreak": 3
    }
  }
}
```

---

### PATCH /users/me

Update current user's profile.

**Headers**: `Authorization: Bearer <token>`

**Request Body** (all fields optional):

```json
{
  "username": "newUsername",
  "location": "New York, NY",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "user": { ... }
  },
  "message": "Profile updated successfully"
}
```

**Error Codes**:

- `USERNAME_TAKEN`: New username already exists

---

### GET /users/:userId/profile

Get another user's public profile.

**Parameters**:

- `userId` (path): User UUID

**Response** (200):

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "adventurer123",
      "level": 4,
      "totalPoints": 45000,
      "avatarUrl": null,
      "memberSince": "2025-10-01T12:00:00Z"
    },
    "stats": {
      "totalItems": 12,
      "totalChallengesCompleted": 15
    },
    "featuredItems": [
      {
        "id": "item_uuid",
        "name": "Golden Brick",
        "rarityTier": "legendary",
        "rarityStars": 4,
        "imageUrl": "https://..."
      }
    ]
  }
}
```

---

## Quest/Challenge Endpoints

### GET /quests/available

Get available quests for the user.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:

- `difficulty` (optional): `easy`, `medium`, `hard`
- `category` (optional): Filter by category
- `limit` (optional): Number of quests per difficulty (default: 3)

**Response** (200):

```json
{
  "success": true,
  "data": {
    "quests": {
      "easy": [
        {
          "id": "uuid",
          "title": "Morning Energizer",
          "description": "Complete a 30-minute workout",
          "difficulty": "easy",
          "pointsReward": 1500,
          "timeLimitHours": 24,
          "category": "Fitness",
          "rewardItem": {
            "name": "Bronze Medal",
            "rarityTier": "common",
            "rarityStars": 0
          }
        }
      ],
      "medium": [ ... ],
      "hard": [ ... ]
    },
    "userActiveQuest": null // or quest object if active
  }
}
```

---

### GET /quests/:questId

Get detailed information about a specific quest.

**Headers**: `Authorization: Bearer <token>`

**Parameters**:

- `questId` (path): Quest UUID

**Response** (200):

```json
{
  "success": true,
  "data": {
    "quest": {
      "id": "uuid",
      "title": "Master Builder",
      "description": "Complete a 500+ piece Lego set. Take your time and enjoy the process!",
      "difficulty": "hard",
      "pointsReward": 35000,
      "timeLimitHours": 168,
      "category": "Building",
      "rewardItem": {
        "name": "Golden Brick",
        "rarityTier": "legendary",
        "rarityStars": 4,
        "imageUrl": "https://..."
      },
      "estimatedDuration": "Several days",
      "prerequisites": null
    }
  }
}
```

---

### POST /quests/:questId/accept

Accept a quest.

**Headers**: `Authorization: Bearer <token>`

**Parameters**:

- `questId` (path): Quest UUID

**Request Body**: None

**Response** (201):

```json
{
  "success": true,
  "data": {
    "activeQuest": {
      "id": "user_quest_uuid",
      "userId": "user_uuid",
      "challengeId": "quest_uuid",
      "quest": { ... },
      "startedAt": "2025-10-08T12:00:00Z",
      "deadlineAt": "2025-10-15T12:00:00Z",
      "isActive": true
    }
  },
  "message": "Quest accepted! Good luck!"
}
```

**Error Codes**:

- `ACTIVE_QUEST_EXISTS`: User already has an active quest
- `QUEST_NOT_FOUND`: Invalid quest ID
- `QUEST_INACTIVE`: Quest is no longer available

---

### POST /quests/:questId/complete

Mark a quest as complete.

**Headers**: `Authorization: Bearer <token>`

**Parameters**:

- `questId` (path): Quest UUID (from user_completed_challenges)

**Request Body**:

```json
{
  "confirmed": true
}
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "completion": {
      "completedAt": "2025-10-08T15:00:00Z",
      "pointsEarned": 35000
    },
    "reward": {
      "item": {
        "id": "item_uuid",
        "name": "Golden Brick",
        "rarityTier": "legendary",
        "rarityStars": 4,
        "imageUrl": "https://..."
      }
    },
    "updatedUser": {
      "totalPoints": 80000,
      "level": 8,
      "leveledUp": true,
      "previousLevel": 7
    }
  },
  "message": "Quest completed! Congratulations!"
}
```

**Error Codes**:

- `QUEST_NOT_FOUND`: Invalid quest ID
- `QUEST_NOT_ACTIVE`: Quest is not active
- `QUEST_EXPIRED`: Past deadline (🚀 future: apply penalty)
- `ALREADY_COMPLETED`: Quest already marked complete

---

### GET /quests/active

Get user's currently active quest.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "activeQuest": {
      "id": "user_quest_uuid",
      "quest": { ... },
      "startedAt": "2025-10-08T12:00:00Z",
      "deadlineAt": "2025-10-15T12:00:00Z",
      "timeRemaining": 604800000, // milliseconds
      "isExpired": false
    }
  }
}
```

**Response if no active quest** (200):

```json
{
  "success": true,
  "data": {
    "activeQuest": null
  }
}
```

---

### GET /quests/history

Get user's quest completion history.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response** (200):

```json
{
  "success": true,
  "data": {
    "completions": [
      {
        "id": "uuid",
        "quest": { ... },
        "startedAt": "2025-10-01T12:00:00Z",
        "completedAt": "2025-10-05T18:00:00Z",
        "pointsEarned": 35000,
        "itemReceived": { ... }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 15,
      "itemsPerPage": 20
    }
  }
}
```

---

## Item/Vault Endpoints

### GET /items/vault

Get user's item collection.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:

- `rarity` (optional): Filter by rarity tier
- `category` (optional): Filter by category
- `sort` (optional): `newest`, `oldest`, `rarity`, `name` (default: `newest`)

**Response** (200):

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "user_item_uuid",
        "item": {
          "id": "item_uuid",
          "name": "Golden Brick",
          "description": "A rare golden Lego brick",
          "rarityTier": "legendary",
          "rarityStars": 4,
          "imageUrl": "https://...",
          "category": "Building"
        },
        "acquiredAt": "2025-10-08T15:00:00Z",
        "isFeatured": true
      }
    ],
    "totalItems": 12,
    "rarityBreakdown": {
      "common": 4,
      "uncommon": 3,
      "rare": 2,
      "epic": 2,
      "legendary": 1,
      "godly": 0
    }
  }
}
```

---

### PATCH /items/:userItemId/featured

Toggle item featured status.

**Headers**: `Authorization: Bearer <token>`

**Parameters**:

- `userItemId` (path): User item UUID

**Request Body**:

```json
{
  "isFeatured": true
}
```

**Response** (200):

```json
{
  "success": true,
  "data": {
    "item": {
      "id": "user_item_uuid",
      "isFeatured": true
    }
  },
  "message": "Item featured on profile"
}
```

**Error Codes**:

- `ITEM_NOT_FOUND`: Item doesn't exist
- `MAX_FEATURED_REACHED`: Already have 5 featured items
- `NOT_OWNER`: Item doesn't belong to user

---

### GET /items/featured

Get user's featured items.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):

```json
{
  "success": true,
  "data": {
    "featuredItems": [
      {
        "id": "user_item_uuid",
        "item": { ... },
        "acquiredAt": "2025-10-08T15:00:00Z"
      }
    ]
  }
}
```

---

## Health & Utility Endpoints

### GET /health

Check API health status (public endpoint).

**Response** (200):

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "timestamp": "2025-10-08T12:00:00Z",
    "database": "connected",
    "uptime": 3600
  }
}
```

---

### GET /stats

Get platform statistics (public endpoint).

**Response** (200):

```json
{
  "success": true,
  "data": {
    "totalUsers": 1523,
    "totalQuestsCompleted": 4567,
    "totalItemsCollected": 12389,
    "averageLevel": 5.2
  }
}
```

---

## 🚀 Future Endpoints (Phase 2+)

## AI Quest Generation

### POST /quests/generate

Generate custom AI quests.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:

```json
{
  "difficulty": "medium",
  "category": "Fitness",
  "timeLimitHours": 72,
  "userContext": {
    "location": "San Francisco, CA",
    "interests": ["hiking", "photography"]
  },
  "count": 3
}
```

**Response** (201):

```json
{
  "success": true,
  "data": {
    "generatedQuests": [
      {
        "id": "temp_quest_id",
        "title": "Golden Gate Trail Explorer",
        "description": "Hike the Lands End Trail...",
        "difficulty": "medium",
        "pointsReward": 8000,
        "timeLimitHours": 72
      }
    ],
    "creditsRemaining": 7
  }
}
```

---

## Friend System

### GET /friends

Get user's friends list.

### POST /friends/request

Send friend request.

### POST /friends/:requestId/accept

Accept friend request.

### DELETE /friends/:friendshipId

Remove friend.

---

## Shop

### GET /shop/items

Get shop inventory.

### POST /shop/items/:itemId/purchase

Purchase item from shop.

---

## Marketplace

### GET /marketplace/listings

Browse marketplace.

### POST /marketplace/listings

Create listing.

### POST /marketplace/listings/:listingId/purchase

Buy listed item.

---

## Rate Limiting

### MVP Rate Limits

- Authentication: 5 requests/minute
- Quest acceptance: 10 requests/minute
- Other endpoints: 100 requests/minute

### Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1696780800
```

---

## Webhook Events (Future)

For integrating with external services:

### POST /webhooks/stripe

Handle Stripe payment events (premium subscriptions).

### POST /webhooks/ai-completion

Handle async AI generation completions.

---

**Last Updated**: October 8, 2025
