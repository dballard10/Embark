import { formatDistanceToNow, isPast } from "date-fns";

/**
 * Format time remaining until deadline
 */
export function formatTimeRemaining(deadline: string): string {
  const deadlineDate = new Date(deadline);

  if (isPast(deadlineDate)) {
    return "Expired";
  }

  return formatDistanceToNow(deadlineDate, { addSuffix: true });
}

/**
 * Check if quest is expired
 */
export function isQuestExpired(deadline: string): boolean {
  return isPast(new Date(deadline));
}
