import React from "react";
import type { QuestTier, QuestTierName } from "../types/quest.types";
import { IconStar, IconFlame } from "@tabler/icons-react";

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
 * Get star display for tier using Tabler icons
 */
export function getTierStars(tier: QuestTier): React.ReactElement {
  const stars = Array.from({ length: tier }, (_, i) => (
    <IconStar key={i} size={16} fill="currentColor" stroke={1.5} />
  ));

  if (tier === 6) {
    return (
      <>
        <IconFlame size={16} fill="currentColor" stroke={1.5} />
        {stars}
      </>
    );
  }

  return <>{stars}</>;
}
