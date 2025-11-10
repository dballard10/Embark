import { IconStar } from "@tabler/icons-react";
import { getTierColor } from "../../utils/tierUtils";
import type { QuestTier } from "../../types/quest.types";

interface RarityBadgeProps {
  rarityStars: number;
  rarityTier: QuestTier;
  size?: "sm" | "md" | "lg";
}

function RarityBadge({
  rarityStars,
  rarityTier,
  size = "md",
}: RarityBadgeProps) {
  const sizeClasses = {
    sm: "px-1.5 py-0.5 gap-0.5",
    md: "px-2 py-1 gap-1",
    lg: "px-3 py-1.5 gap-1.5",
  };

  const starSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <div
      className={`flex items-center ${
        sizeClasses[size]
      } rounded-lg bg-gradient-to-r ${getTierColor(
        rarityTier as QuestTier
      )} border border-white/30 text-xs font-bold text-white shadow-lg`}
    >
      {Array.from({ length: rarityStars }, (_, i) => (
        <IconStar
          key={i}
          size={starSizes[size]}
          className={rarityTier === 6 ? "text-yellow-300" : "text-white"}
          fill="currentColor"
          stroke={1.5}
        />
      ))}
    </div>
  );
}

export default RarityBadge;
