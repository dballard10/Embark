import type { UserItem } from "../../types/item.types";
import {
  getTierGradientColor,
  getTierColor,
  getTierStars,
} from "../../utils/tierUtils";
import { getItemImage } from "../../utils/itemImageUtils";
import ItemIcon from "./ItemIcon";

interface ItemCardProps {
  userItem: UserItem;
  onClick?: () => void;
}

function ItemCard({ userItem, onClick }: ItemCardProps) {
  const item = userItem.item;

  if (!item) {
    return null;
  }

  const itemImage = getItemImage(item.name, item.image_url);

  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex flex-col bg-gradient-to-br ${getTierGradientColor(
        item.rarity_tier
      )} border-2 rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer`}
    >
      {/* Rarity Stars Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div
          className={`flex items-center gap-0.5 px-2 py-1 rounded-lg bg-gradient-to-r ${getTierColor(
            item.rarity_tier
          )} border border-white/30 text-xs font-bold text-white shadow-lg`}
        >
          {getTierStars(item.rarity_tier)}
        </div>
      </div>

      {/* Item Image/Placeholder */}
      <div className="h-32 bg-gradient-to-br from-slate-700/30 to-slate-800/30 flex items-center justify-center relative overflow-hidden">
        {itemImage ? (
          <img
            src={itemImage}
            alt={item.name}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <ItemIcon size={64} className="text-white/20" />
        )}
      </div>

      {/* Item Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-white line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2 mt-1">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
