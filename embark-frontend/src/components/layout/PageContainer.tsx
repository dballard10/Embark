import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Standard page container with consistent padding and max-width
 */
export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 ${className}`}
    >
      {children}
    </div>
  );
}
