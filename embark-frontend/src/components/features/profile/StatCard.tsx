import type { Icon } from "@tabler/icons-react";

type StatColor = "green" | "blue" | "amber" | "purple" | "red" | "cyan";

interface StatCardProps {
  icon: Icon;
  value: number;
  label: string;
  color: StatColor;
  animated?: boolean;
  filled?: boolean;
  onClick?: () => void;
}

const colorStyles: Record<
  StatColor,
  {
    border: string;
    bg: string;
    cardBg: string;
    iconBg: string;
    iconColor: string;
    shadow: string;
  }
> = {
  green: {
    border: "border-green-500/30 hover:border-green-400/60",
    bg: "from-green-500/5",
    cardBg: "from-green-900/50 to-green-950/50",
    iconBg: "from-green-700/40 to-green-800/40",
    iconColor: "text-green-400",
    shadow: "hover:shadow-green-500/20",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-400/60",
    bg: "from-blue-500/5",
    cardBg: "from-blue-900/50 to-blue-950/50",
    iconBg: "from-blue-700/40 to-blue-800/40",
    iconColor: "text-blue-400",
    shadow: "hover:shadow-blue-500/20",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-400/60",
    bg: "from-amber-500/5",
    cardBg: "from-amber-900/50 to-amber-950/50",
    iconBg: "from-amber-700/40 to-amber-800/40",
    iconColor: "text-amber-400",
    shadow: "hover:shadow-amber-500/20",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-400/60",
    bg: "from-purple-500/5",
    cardBg: "from-purple-900/50 to-purple-950/50",
    iconBg: "from-purple-700/40 to-purple-800/40",
    iconColor: "text-purple-400",
    shadow: "hover:shadow-purple-500/20",
  },
  red: {
    border: "border-red-500/30 hover:border-red-400/60",
    bg: "from-red-500/5",
    cardBg: "from-red-900/50 to-red-950/50",
    iconBg: "from-red-700/40 to-red-800/40",
    iconColor: "text-red-400",
    shadow: "hover:shadow-red-500/20",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-400/60",
    bg: "from-cyan-500/5",
    cardBg: "from-cyan-900/50 to-cyan-950/50",
    iconBg: "from-cyan-700/40 to-cyan-800/40",
    iconColor: "text-cyan-400",
    shadow: "hover:shadow-cyan-500/20",
  },
};

export function StatCard({
  icon: Icon,
  value,
  label,
  color,
  animated = false,
  filled = false,
  onClick,
}: StatCardProps) {
  const styles = colorStyles[color];
  const isClickable = !!onClick;

  return (
    <div
      className={`group relative bg-gradient-to-br ${styles.cardBg} backdrop-blur-xl border-2 ${
        styles.border
      } rounded-2xl p-6 text-center ${
        styles.shadow
      } transition-all duration-300 hover:scale-[1.03] ${
        isClickable ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${styles.bg} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      <div className="relative">
        <div
          className={`inline-flex p-3 bg-gradient-to-br ${styles.iconBg} rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon
            size={32}
            className={`${styles.iconColor} drop-shadow-glow ${
              animated ? "animate-pulse-subtle" : ""
            }`}
            stroke={2.5}
            fill={filled ? "currentColor" : "none"}
          />
        </div>
        <div className="text-3xl font-black text-white mb-2 drop-shadow">
          {value}
        </div>
        <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
          {label}
        </div>
      </div>
    </div>
  );
}
