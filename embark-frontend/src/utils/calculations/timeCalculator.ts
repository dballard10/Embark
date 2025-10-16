/**
 * Calculate time remaining until a deadline
 */
export function calculateTimeRemaining(deadlineAt: string): {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
} {
  const deadline = new Date(deadlineAt);
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    isExpired: false,
    totalSeconds,
  };
}

/**
 * Format time remaining as a human-readable string
 */
export function formatTimeRemaining(deadlineAt: string): string {
  const { hours, minutes, isExpired } = calculateTimeRemaining(deadlineAt);

  if (isExpired) {
    return "Expired";
  }

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

/**
 * Calculate quest deadline from start time and duration
 */
export function calculateDeadline(
  startedAt: string,
  durationHours: number
): string {
  const start = new Date(startedAt);
  const deadline = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  return deadline.toISOString();
}

/**
 * Check if a quest is expiring soon (less than 25% time remaining)
 */
export function isExpiringSoon(startedAt: string, deadlineAt: string): boolean {
  const start = new Date(startedAt);
  const deadline = new Date(deadlineAt);
  const now = new Date();

  const totalDuration = deadline.getTime() - start.getTime();
  const timeRemaining = deadline.getTime() - now.getTime();

  if (timeRemaining <= 0) return false; // Already expired

  const percentRemaining = (timeRemaining / totalDuration) * 100;
  return percentRemaining < 25;
}

/**
 * Get time progress percentage (0-100)
 */
export function getTimeProgress(startedAt: string, deadlineAt: string): number {
  const start = new Date(startedAt);
  const deadline = new Date(deadlineAt);
  const now = new Date();

  const totalDuration = deadline.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();

  if (elapsed <= 0) return 0;
  if (elapsed >= totalDuration) return 100;

  return (elapsed / totalDuration) * 100;
}
