/**
 * Format number with commas as thousands separators
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Format number as compact notation (1.2K, 3.4M, etc.)
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  if (num < 1000000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  return `${(num / 1000000000).toFixed(1)}B`;
}

/**
 * Format percentage with specified decimal places
 */
export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format currency/glory amount
 */
export function formatGlory(amount: number): string {
  return formatNumber(amount);
}

/**
 * Format XP amount
 */
export function formatXP(amount: number): string {
  return formatNumber(amount);
}

/**
 * Parse number from formatted string
 */
export function parseFormattedNumber(str: string): number {
  return parseInt(str.replace(/,/g, ""), 10) || 0;
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate percentage of value out of total
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}
