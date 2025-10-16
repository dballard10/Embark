import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { Item } from "../../types/item.types";
import { getTierColor, getTierName } from "../../utils/tierUtils";
import JsonViewer from "./JsonViewer";
import { getItemImage } from "../../utils/itemImageUtils";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const tierColor = getTierColor(item.rarity_tier);
  const tierName = getTierName(item.rarity_tier);
  const itemImage = getItemImage(item.name, item.image_url);

  return (
    <div className="bg-slate-800 rounded-lg p-5 border-2 border-slate-700 hover:border-slate-600 transition-all duration-200 shadow-lg">
      {/* Header with Actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-white leading-tight flex-1">
          {item.name}
        </h3>
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-full text-xs font-bold ${tierColor} whitespace-nowrap`}
          >
            T{item.rarity_tier} - {tierName}
          </div>
          <button
            onClick={() => onEdit(item)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            title="Edit Item"
          >
            <IconEdit size={16} />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="Delete Item"
          >
            <IconTrash size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
        {item.description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-slate-900 rounded p-2">
          <div className="text-slate-400 text-xs">Rarity Stars</div>
          <div className="text-amber-400 font-bold">
            {"⭐".repeat(item.rarity_stars)}
          </div>
        </div>
        <div className="bg-slate-900 rounded p-2">
          <div className="text-slate-400 text-xs">Tier</div>
          <div className="text-slate-200 font-bold">{item.rarity_tier}</div>
        </div>
        <div className="bg-slate-900 rounded p-2 col-span-2">
          <div className="text-slate-400 text-xs">Price</div>
          <div className="text-amber-500 font-bold">
            {item.price.toLocaleString()} Glory
          </div>
        </div>
        <div className="bg-slate-900 rounded p-2 col-span-2">
          <div className="text-slate-400 text-xs">ID</div>
          <div className="text-slate-300 font-mono text-xs truncate">
            {item.id}
          </div>
        </div>
      </div>

      {/* Image Information */}
      <div className="mt-3 space-y-1">
        {item.image_url && (
          <div className="text-xs text-slate-400">
            <span className="text-slate-500">DB Image: </span>
            <span className="font-mono break-all">{item.image_url}</span>
          </div>
        )}
        {itemImage && (
          <div className="text-xs text-slate-400">
            <span className="text-slate-500">Local Image: </span>
            <span className="font-mono break-all">{itemImage}</span>
          </div>
        )}
      </div>

      <JsonViewer data={item} />
    </div>
  );
}

export default ItemCard;
