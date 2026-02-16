import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: "none" | "small" | "medium" | "large";
}

const paddingStyles = {
  none: "",
  small: "p-4",
  medium: "p-6",
  large: "p-8",
};

export function Card({
  children,
  className = "",
  onClick,
  hoverable = false,
  padding = "medium",
}: CardProps) {
  const isClickable = !!onClick;

  return (
    <div
      className={`
        bg-gradient-to-br from-slate-800/95 to-slate-900/95
        backdrop-blur-xl
        rounded-2xl
        border-2 border-slate-700/50
        shadow-lg
        ${
          hoverable || isClickable
            ? "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            : ""
        }
        ${isClickable ? "cursor-pointer" : ""}
        ${paddingStyles[padding]}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-xl font-bold text-white ${className}`}>{children}</h3>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mt-4 ${className}`}>{children}</div>;
}
