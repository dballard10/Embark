interface LoadingIconProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

function LoadingIcon({ size = "medium", className = "" }: LoadingIconProps) {
  // Size mapping
  const sizeMap = {
    small: 24,
    medium: 48,
    large: 64,
  };

  const dimension = sizeMap[size];

  return (
    <div className={`loading-icon-container ${className}`}>
      <div
        className="loading-spinner"
        style={{ width: dimension, height: dimension }}
      />
      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loading-icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .loading-spinner {
          border: 3px solid transparent;
          border-top: 3px solid currentColor;
          border-right: 3px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          filter: drop-shadow(0 0 6px currentColor);
        }
      `}</style>
    </div>
  );
}

export default LoadingIcon;
