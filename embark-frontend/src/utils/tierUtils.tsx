import React from "react";
import type { QuestTier, QuestTierName } from "../types/quest.types";
import { IconStar } from "@tabler/icons-react";

/**
 * Get color class for tier badge
 */
export function getTierColor(tier: QuestTier): string {
  const colors: Record<QuestTier, string> = {
    1: "from-gray-500 to-gray-600", // Novice
    2: "from-green-500 to-green-600", // Adventurer
    3: "from-blue-500 to-blue-600", // Warrior
    4: "from-purple-500 to-purple-600", // Champion
    5: "from-orange-500 to-red-600", // Master
    6: "from-red-600 to-pink-600", // Conqueror
  };
  return colors[tier];
}

/**
 * Get tier name from number
 */
export function getTierName(tier: QuestTier): QuestTierName {
  const names: Record<QuestTier, QuestTierName> = {
    1: "Novice",
    2: "Adventurer",
    3: "Warrior",
    4: "Champion",
    5: "Master",
    6: "Conqueror",
  };
  return names[tier];
}

/**
 * Get gradient color classes for tier (used for card backgrounds)
 * Returns format: "from-color to-color border-color"
 */
export function getTierGradientColor(tier: number): string {
  const colors: Record<number, string> = {
    1: "from-gray-600 to-gray-700 border-gray-500/40",
    2: "from-green-600 to-green-700 border-green-500/40",
    3: "from-blue-600 to-blue-700 border-blue-500/40",
    4: "from-purple-600 to-purple-700 border-purple-500/40",
    5: "from-orange-600 to-orange-700 border-orange-500/40",
    6: "from-red-600 to-red-700 border-red-500/40",
  };
  return colors[tier] || colors[1];
}

/**
 * Get border color class for tier (used for borders only)
 */
export function getTierBorderColor(tier: number): string {
  const colors: Record<number, string> = {
    1: "border-gray-500/50",
    2: "border-green-500/50",
    3: "border-blue-500/50",
    4: "border-purple-500/50",
    5: "border-orange-500/50",
    6: "border-red-500/50",
  };
  return colors[tier] || colors[1];
}

/**
 * Get star display for tier using Tabler icons
 * Tier 6 gets special golden stars with shimmer effect
 */
export function getTierStars(tier: QuestTier): React.ReactElement {
  const stars = Array.from({ length: tier }, (_, i) => (
    <IconStar key={i} size={16} fill="currentColor" stroke={1.5} />
  ));

  // Special styling for tier 6 - golden stars with shimmer
  if (tier === 6) {
    return (
      <span className="flex items-center gap-0.5 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)] animate-pulse-subtle">
        {stars}
      </span>
    );
  }

  return <>{stars}</>;
}
