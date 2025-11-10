import { getTierColor } from "../../utils/tierUtils";
import type { Achievement } from "../../types/achievement.types";

interface TitleBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

function TitleBadge({ achievement, size = "md", onClick }: TitleBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2 py-0.5",
    lg: "text-base px-2 py-0.5",
  };

  // Tier 6 and questline achievements get special styling
  const isSpecial =
    achievement.tier === 6 || achievement.achievement_type === "questline";

  // Special achievements get tier 6 conqueror color with shine effect
  const gradientClass = isSpecial
    ? "from-red-600 to-pink-600"
    : `${getTierColor(achievement.color_tier)}`;

  const Component = onClick ? "button" : "span";
  const clickableClasses = onClick
    ? "cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-xl"
    : "";

  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-center ${
        sizeClasses[size]
      } rounded-full bg-gradient-to-r ${gradientClass} border border-white/30 font-bold text-white shadow-lg whitespace-nowrap ${clickableClasses} ${
        isSpecial ? "relative overflow-hidden" : ""
      }`}
    >
      {isSpecial && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      )}
      <span className="relative z-10 flex items-center">
        {achievement.title}
      </span>
    </Component>
  );
}

export default TitleBadge;
