import LoadingIcon from "./LoadingIcon";

interface CardSkeletonProps {
  variant: "item" | "quest";
}

function CardSkeleton({ variant }: CardSkeletonProps) {
  if (variant === "item") {
    return (
      <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-sm rounded-xl border-2 border-slate-800/50 shadow-xl h-80 animate-pulse relative flex items-center justify-center">
        <LoadingIcon size="medium" />
      </div>
    );
  }

  // Quest variant
  return (
    <div className="quest-card-locked animate-pulse relative flex items-center justify-center">
      <LoadingIcon size="medium" />
    </div>
  );
}

export default CardSkeleton;
