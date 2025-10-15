interface ItemDetailsModalSkeletonProps {
  tierBorderColor?: string;
}

function ItemDetailsModalSkeleton({
  tierBorderColor = "border-purple-500/50",
}: ItemDetailsModalSkeletonProps) {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Item Image and Title Section */}
      <div
        className={`bg-black/10 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl overflow-hidden shadow-2xl`}
      >
        {/* Image Placeholder */}
        <div className="h-64 relative bg-transparent backdrop-blur-md">
          <div className="w-full h-full flex items-center justify-center p-8">
            {/* Centered image skeleton */}
            <div className="w-48 h-48 bg-white/5 rounded-lg"></div>
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

      {/* Date Obtained Skeleton */}
      <div
        className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-5`}
      >
        <div className="flex items-center gap-3">
          {/* Icon skeleton */}
          <div className="w-7 h-7 bg-white/10 rounded"></div>
          <div className="flex-1 space-y-2">
            {/* Label */}
            <div className="h-4 bg-white/5 rounded w-32"></div>
            {/* Date */}
            <div className="h-6 bg-white/10 rounded w-40"></div>
          </div>
        </div>
      </div>

      {/* Additional Info Section Skeleton */}
      <div
        className={`bg-black/20 backdrop-blur-sm border-2 ${tierBorderColor} rounded-xl p-6`}
      >
        {/* Section Title */}
        <div className="h-7 bg-white/10 rounded w-36 mb-4"></div>
        {/* Info rows */}
        <div className="space-y-3">
          {/* Row 1 */}
          <div className="flex justify-between py-2 border-b border-slate-700/50">
            <div className="h-5 bg-white/5 rounded w-20"></div>
            <div className="h-5 bg-white/5 rounded w-32"></div>
          </div>
          {/* Row 2 */}
          <div className="flex justify-between py-2 border-b border-slate-700/50">
            <div className="h-5 bg-white/5 rounded w-16"></div>
            <div className="h-5 bg-white/5 rounded w-36"></div>
          </div>
          {/* Row 3 */}
          <div className="flex justify-between py-2">
            <div className="h-5 bg-white/5 rounded w-14"></div>
            <div className="h-5 bg-white/5 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsModalSkeleton;
