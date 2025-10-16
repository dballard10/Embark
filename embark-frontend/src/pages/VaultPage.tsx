import { useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import CardSkeleton from "../components/common/CardSkeleton";
import ItemDetailsModal from "../components/common/ItemDetailsModal";
import LoadingIcon from "../components/common/LoadingIcon";
import {
  getTierStars,
  getTierGradientColor,
  getTierColor,
} from "../utils/tierUtils";
import { useUser } from "../contexts/UserContext";
import { useItems } from "../contexts/ItemsContext";
import { getItemImage } from "../utils/itemImageUtils";
import ItemIcon from "../components/common/ItemIcon";
import { IconBox } from "@tabler/icons-react";

function VaultPage() {
  const { selectedUser, isLoading: userLoading } = useUser();
  const { items: userItems, itemCount, loading } = useItems();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <LoadingIcon size="large" />
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Top Stats Bar */}
      <TopBar
        username={selectedUser.username}
        totalXP={selectedUser.total_xp}
        totalGlory={selectedUser.total_glory}
        totalItems={itemCount}
        isLoadingItems={loading}
      />

      {/* Vault Header */}
      <div className="bg-gradient-to-r from-green-900/90 via-emerald-900/90 to-green-900/90 border-b-2 border-green-600 fixed top-[72px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
                <IconBox size={32} className="text-white" stroke={2} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-green-100">
                  Item Vault
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-green-600/30 to-emerald-600/30 border-2 border-green-500/40">
              <IconBox size={28} className="text-green-400" stroke={2} />
              <div>
                <div className="text-xs text-green-300/80 font-semibold">
                  Total Items
                </div>
                <div className="text-2xl font-bold text-green-200">
                  {loading ? <LoadingIcon size="small" /> : itemCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24 pt-[168px]">
        {/* Item Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} variant="item" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userItems.map((userItem) => {
              const item = userItem.item;
              if (!item) return null;

              const itemImage = getItemImage(item.name, item.image_url);

              return (
                <div
                  key={userItem.id}
                  onClick={() => {
                    setSelectedItemId(userItem.id);
                    setIsModalOpen(true);
                  }}
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

                  {/* Item Icon Area */}
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
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="vault" />

      {/* Item Details Modal */}
      {selectedItemId && (
        <ItemDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItemId(null);
          }}
          userItemId={selectedItemId}
        />
      )}
    </div>
  );
}

export default VaultPage;
