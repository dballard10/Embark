import type { UserCompletedQuest } from "../../types/quest.types";
import { GAME_CONFIG } from "../constants/gameConfig";

/**
 * Check if user can start a new quest
 */
export function canStartQuest(activeQuests: UserCompletedQuest[]): {
  canStart: boolean;
  reason?: string;
} {
  if (activeQuests.length >= GAME_CONFIG.MAX_ACTIVE_QUESTS) {
    return {
      canStart: false,
      reason: `You already have the maximum number of active quests (${GAME_CONFIG.MAX_ACTIVE_QUESTS})`,
    };
  }

  return { canStart: true };
}

/**
 * Check if a quest has already been completed
 */
export function hasCompletedQuest(
  questId: string,
  completedQuests: UserCompletedQuest[]
): boolean {
  return completedQuests.some((q) => q.quest_id === questId);
}

/**
 * Check if a quest is currently active
 */
export function isQuestActive(
  questId: string,
  activeQuests: UserCompletedQuest[]
): boolean {
  return activeQuests.some((q) => q.quest_id === questId);
}

/**
 * Check if a quest is expired
 */
export function isQuestExpired(deadlineAt: string): boolean {
  const deadline = new Date(deadlineAt);
  const now = new Date();
  return now > deadline;
}

/**
 * Validate quest can be completed
 */
export function canCompleteQuest(quest: UserCompletedQuest): {
  canComplete: boolean;
  reason?: string;
} {
  if (!quest.is_active) {
    return {
      canComplete: false,
      reason: "Quest is not active",
    };
  }

  if (isQuestExpired(quest.deadline_at)) {
    return {
      canComplete: false,
      reason: "Quest deadline has passed",
    };
  }

  return { canComplete: true };
}

/**
 * Validate quest can be abandoned
 */
export function canAbandonQuest(quest: UserCompletedQuest): {
  canAbandon: boolean;
  reason?: string;
} {
  if (!quest.is_active) {
    return {
      canAbandon: false,
      reason: "Quest is not active",
    };
  }

  return { canAbandon: true };
}

/**
 * Check if user can select a specific quest
 */
export function canSelectQuest(
  questId: string,
  activeQuests: UserCompletedQuest[],
  completedQuests: UserCompletedQuest[]
): {
  canSelect: boolean;
  reason?: string;
} {
  // Check if already active
  if (isQuestActive(questId, activeQuests)) {
    return {
      canSelect: false,
      reason: "This quest is already active",
    };
  }

  // Check if can start more quests
  const canStartResult = canStartQuest(activeQuests);
  if (!canStartResult.canStart) {
    return canStartResult;
  }

  return { canSelect: true };
}
