/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Capitalize first letter of string
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Convert snake_case to Title Case
 */
export function snakeToTitle(text: string): string {
  return capitalizeWords(text.replace(/_/g, " "));
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitle(text: string): string {
  return capitalizeWords(text.replace(/([A-Z])/g, " $1").trim());
}

/**
 * Create initials from name
 */
export function getInitials(name: string, maxInitials = 2): string {
  const words = name.split(" ").filter((word) => word.length > 0);
  return words
    .slice(0, maxInitials)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Pluralize word based on count
 */
export function pluralize(
  word: string,
  count: number,
  pluralForm?: string
): string {
  if (count === 1) {
    return word;
  }
  return pluralForm || `${word}s`;
}

/**
 * Create a URL-friendly slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extract excerpt from longer text
 */
export function excerpt(
  text: string,
  maxLength: number,
  suffix = "..."
): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Try to break at word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + suffix;
  }

  return truncated + suffix;
}
