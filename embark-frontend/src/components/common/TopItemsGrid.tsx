import ItemCard from "./ItemCard";
import CardSkeleton from "./CardSkeleton";
import type { UserItem } from "../../types/item.types";
import { IconDiamond, IconArrowRight, IconBox } from "@tabler/icons-react";

interface TopItemsGridProps {
  topItems: UserItem[];
  loading: boolean;
  onViewAll: () => void;
  onItemClick: (userItemId: string) => void;
}

function TopItemsGrid({
  topItems,
  loading,
  onViewAll,
  onItemClick,
}: TopItemsGridProps) {
  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border-2 border-green-400/30 font-bold">
          <IconBox size={20} className="text-green-400" stroke={2} />
          <span className="text-lg">Top Items</span>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-700 to-green-500 hover:from-green-500 hover:to-green-300 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
        >
          View All Items
          <IconArrowRight size={18} stroke={2} />
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} variant="item" />
            ))
          : topItems.length === 0
          ? // Show empty state if no items
            [...Array(4)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-xl p-8 flex flex-col items-center justify-center text-center"
              >
                <IconBox
                  size={48}
                  className="text-slate-600 mb-3"
                  stroke={1.5}
                />
                <p className="text-gray-500 text-sm">No items yet</p>
              </div>
            ))
          : // Show items with empty placeholders to fill the grid
            [...Array(4)].map((_, index) => {
              const userItem = topItems[index];
              return userItem ? (
                <ItemCard
                  key={userItem.id}
                  userItem={userItem}
                  onClick={() => onItemClick(userItem.id)}
                />
              ) : (
                <div
                  key={`placeholder-${index}`}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-xl p-8 flex flex-col items-center justify-center text-center"
                >
                  <IconDiamond
                    size={48}
                    className="text-slate-600 mb-3"
                    stroke={1.5}
                  />
                  <p className="text-gray-500 text-sm">Empty slot</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default TopItemsGrid;
