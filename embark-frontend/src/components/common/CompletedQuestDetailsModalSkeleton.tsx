import LoadingIcon from "./LoadingIcon";

interface CompletedQuestDetailsModalSkeletonProps {
  tierBorderColor?: string;
}

function CompletedQuestDetailsModalSkeleton({
  tierBorderColor = "border-blue-500/50",
}: CompletedQuestDetailsModalSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Enemy Image and Title Section */}
      <div
        className={`bg-black/10 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
      >
        {/* Enemy Image Placeholder */}
        <div className="h-64 relative bg-transparent backdrop-blur-md">
          <div className="w-full h-full flex items-center justify-center p-8">
            {/* Centered loading icon */}
            <LoadingIcon size="large" />
          </div>

          {/* Tier Badge Skeleton */}
          <div className="absolute top-4 right-4">
            <div className="w-32 h-9 bg-white/10 rounded-lg"></div>
          </div>
        </div>

        {/* Enemy Name and Type Skeleton */}
        <div className="p-6 space-y-4 bg-black/20">
          {/* Enemy Name */}
          <div className="h-9 bg-white/10 rounded-lg w-3/4"></div>
          {/* Enemy Type */}
          <div className="h-5 bg-white/5 rounded w-1/2"></div>
          {/* Enemy Description */}
          <div className="space-y-2">
            <div className="h-5 bg-white/5 rounded w-full"></div>
            <div className="h-5 bg-white/5 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      {/* Quest Information Skeleton */}
      <div
        className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
      >
        {/* Section Title */}
        <div className="h-7 bg-white/10 rounded w-40 mb-4"></div>
        {/* Quest Title */}
        <div className="h-6 bg-white/10 rounded w-5/6 mb-3"></div>
        {/* Quest Description */}
        <div className="space-y-2">
          <div className="h-5 bg-white/5 rounded w-full"></div>
          <div className="h-5 bg-white/5 rounded w-4/5"></div>
        </div>
      </div>

      {/* Rewards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
        >
          <div className="h-20 bg-white/5 rounded"></div>
        </div>
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
        >
          <div className="h-20 bg-white/5 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default CompletedQuestDetailsModalSkeleton;
