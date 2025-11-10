import type { ReactNode } from "react";

export type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "gray";
export type BadgeSize = "small" | "medium" | "large";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  success: "bg-green-500/20 text-green-300 border-green-400/30",
  warning: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
  danger: "bg-red-500/20 text-red-300 border-red-400/30",
  info: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
  gray: "bg-gray-500/20 text-gray-300 border-gray-400/30",
};

const sizeStyles: Record<BadgeSize, string> = {
  small: "px-2 py-0.5 text-xs",
  medium: "px-3 py-1 text-xs",
  large: "px-4 py-1.5 text-sm",
};

export function Badge({
  children,
  variant = "primary",
  size = "medium",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-lg
        border
        font-bold uppercase tracking-wide
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
