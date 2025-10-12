import { useNavigate } from "react-router-dom";
import type { UserItem } from "../../types/item.types";
import { getTierColor, getTierName } from "../../utils/tierUtils";
import { IconStar, IconBox } from "@tabler/icons-react";
import { formatDateFriendly } from "../../utils/dateUtils";

interface ItemCardProps {
  userItem: UserItem;
}

function ItemCard({ userItem }: ItemCardProps) {
  const navigate = useNavigate();
  const item = userItem.item;

  if (!item) {
    return null;
  }

  const tierColor = getTierColor(item.rarity_tier);
  const tierName = getTierName(item.rarity_tier);

  const handleClick = () => {
    navigate(`/item/${userItem.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-purple-500/30 rounded-xl overflow-hidden shadow-lg hover:border-purple-400/50 hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      {/* Item Image/Placeholder */}
      <div className="flex items-center justify-center h-40 bg-gradient-to-br from-purple-600/20 to-blue-600/20 relative">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <IconBox size={64} className="text-purple-400" stroke={1.5} />
        )}

        {/* Tier Badge */}
        <div className="absolute top-3 right-3">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r ${tierColor} border border-white/30 text-xs font-bold text-white shadow-lg`}
          >
            <span>T{item.rarity_tier}</span>
          </div>
        </div>
      </div>

      {/* Item Info */}
      <div className="p-4 space-y-2">
        {/* Item Name */}
        <h3 className="text-lg font-bold text-white leading-tight truncate">
          {item.name}
        </h3>

        {/* Rarity Stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: item.rarity_stars }, (_, i) => (
            <IconStar
              key={i}
              size={16}
              className="text-yellow-400"
              fill="currentColor"
              stroke={1.5}
            />
          ))}
          <span className="text-xs text-gray-400 ml-2">{tierName}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Acquired Date */}
        <div className="pt-2 border-t border-slate-700">
          <div className="text-xs text-gray-400">
            Obtained {formatDateFriendly(userItem.acquired_at)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
