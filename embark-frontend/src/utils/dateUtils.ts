import { formatDistanceToNow, isPast, format } from "date-fns";

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

/**
 * Format date in a friendly, readable way
 */
export function formatDateFriendly(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  // If less than 7 days ago, show relative time
  if (diffInDays < 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  // Otherwise show formatted date
  return format(date, "MMM d, yyyy");
}
