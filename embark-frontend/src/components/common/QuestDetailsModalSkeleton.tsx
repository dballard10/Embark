interface QuestDetailsModalSkeletonProps {
  tierBorderColor?: string;
}

function QuestDetailsModalSkeleton({
  tierBorderColor = "border-purple-500/50",
}: QuestDetailsModalSkeletonProps) {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Quest Icon and Title Section */}
      <div
        className={`bg-black/10 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
      >
        {/* Icon Placeholder */}
        <div className="h-48 relative bg-transparent backdrop-blur-md">
          <div className="w-full h-full flex items-center justify-center p-8">
            {/* Centered icon skeleton */}
            <div className="w-24 h-24 bg-white/5 rounded-lg"></div>
          </div>

          {/* Tier Badge Skeleton */}
          <div className="absolute top-4 right-4">
            <div className="w-32 h-9 bg-white/10 rounded-lg"></div>
          </div>
        </div>

        {/* Title and Description Skeleton */}
        <div className="p-6 space-y-4 bg-black/20">
          {/* Title */}
          <div className="h-9 bg-white/10 rounded-lg w-3/4"></div>
          {/* Description lines */}
          <div className="space-y-2">
            <div className="h-5 bg-white/5 rounded w-full"></div>
            <div className="h-5 bg-white/5 rounded w-5/6"></div>
            <div className="h-5 bg-white/5 rounded w-4/5"></div>
          </div>
        </div>
      </div>

      {/* Timer Display Skeleton */}
      <div
        className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
      >
        <div className="flex items-center gap-3">
          {/* Icon skeleton */}
          <div className="w-8 h-8 bg-white/10 rounded"></div>
          <div className="flex-1 space-y-2">
            {/* Label */}
            <div className="h-4 bg-white/5 rounded w-32"></div>
            {/* Timer */}
            <div className="h-8 bg-white/10 rounded w-40"></div>
          </div>
        </div>
      </div>

      {/* Quest Info Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Info Card 1 */}
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white/10 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/5 rounded w-28"></div>
              <div className="h-6 bg-white/10 rounded w-20"></div>
            </div>
          </div>
        </div>

        {/* Info Card 2 */}
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white/10 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/5 rounded w-24"></div>
              <div className="h-6 bg-white/10 rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Info Card 3 */}
        <div
          className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white/10 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/5 rounded w-32"></div>
              <div className="h-6 bg-white/10 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Section Skeleton */}
      <div
        className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
      >
        {/* Section Title */}
        <div className="h-8 bg-white/10 rounded w-32 mb-4"></div>

        {/* Reward Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Reward Box 1 - Glory */}
          <div className="bg-yellow-900/20 border-2 border-yellow-600/40 rounded-lg p-6">
            <div className="w-12 h-12 bg-yellow-400/20 rounded mx-auto mb-3"></div>
            <div className="h-4 bg-white/5 rounded w-16 mx-auto mb-2"></div>
            <div className="h-8 bg-white/10 rounded w-20 mx-auto"></div>
          </div>

          {/* Reward Box 2 - XP */}
          <div className="bg-blue-900/20 border-2 border-blue-600/40 rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-400/20 rounded mx-auto mb-3"></div>
            <div className="h-4 bg-white/5 rounded w-20 mx-auto mb-2"></div>
            <div className="h-8 bg-white/10 rounded w-20 mx-auto"></div>
          </div>

          {/* Reward Box 3 - Item */}
          <div className="bg-purple-900/20 border-2 border-purple-600/40 rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-400/20 rounded mx-auto mb-3"></div>
            <div className="h-4 bg-white/5 rounded w-24 mx-auto mb-2"></div>
            <div className="h-6 bg-white/10 rounded w-32 mx-auto mb-2"></div>
            <div className="space-y-1">
              <div className="h-3 bg-white/5 rounded w-full"></div>
              <div className="h-3 bg-white/5 rounded w-4/5 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-14 bg-white/10 rounded-xl"></div>
        <div className="h-14 bg-white/10 rounded-xl"></div>
      </div>
    </div>
  );
}

export default QuestDetailsModalSkeleton;
