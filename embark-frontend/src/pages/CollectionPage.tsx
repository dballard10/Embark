import { useState, useMemo, useCallback } from 'react';
import { BottomNav } from '../components/layout/BottomNav';
import { TopBar } from '../components/layout/TopBar';
import { useGacha } from '../contexts/GachaContext';
import { ITEM_CATALOG, TIER_NAMES, SELL_PRICES, TOTAL_ITEMS } from '../data/itemCatalog';
import type { RarityTier, ItemCategory, GachaItem } from '../types/item.types';

type FilterTier = 'all' | RarityTier;
type FilterCategory = 'all' | ItemCategory;
type FilterOwned = 'all' | 'owned' | 'missing';
type SortBy = 'tier-desc' | 'tier-asc' | 'name' | 'quantity';

const CATEGORY_LABELS: Record<ItemCategory, string> = {
  warrior: 'Warrior',
  creature: 'Creature',
  elemental: 'Elemental',
  mythology: 'Mythology',
};

const TIER_BG: Record<RarityTier, string> = {
  1: 'from-gray-700 to-gray-800 border-gray-500/50',
  2: 'from-green-800 to-green-900 border-green-500/50',
  3: 'from-blue-800 to-blue-900 border-blue-500/50',
  4: 'from-purple-800 to-purple-900 border-purple-500/50',
  5: 'from-orange-800 to-orange-900 border-orange-500/50',
  6: 'from-red-800 to-red-900 border-red-500/50',
};

const TIER_TEXT: Record<RarityTier, string> = {
  1: 'text-gray-300',
  2: 'text-green-300',
  3: 'text-blue-300',
  4: 'text-purple-300',
  5: 'text-orange-300',
  6: 'text-red-300',
};

export default function CollectionPage() {
  const { uniqueItemCount, getOwnedCount, isOwned, sellItem, inventory } = useGacha();
  const [tierFilter, setTierFilter] = useState<FilterTier>('all');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [ownedFilter, setOwnedFilter] = useState<FilterOwned>('all');
  const [sortBy, setSortBy] = useState<SortBy>('tier-desc');
  const [selectedItem, setSelectedItem] = useState<GachaItem | null>(null);

  const progress = (uniqueItemCount / TOTAL_ITEMS) * 100;

  const filteredItems = useMemo(() => {
    let items = ITEM_CATALOG;

    if (tierFilter !== 'all') {
      items = items.filter((i) => i.tier === tierFilter);
    }
    if (categoryFilter !== 'all') {
      items = items.filter((i) => i.category === categoryFilter);
    }
    if (ownedFilter === 'owned') {
      items = items.filter((i) => isOwned(i.id));
    } else if (ownedFilter === 'missing') {
      items = items.filter((i) => !isOwned(i.id));
    }

    const sorted = [...items];
    switch (sortBy) {
      case 'tier-desc':
        sorted.sort((a, b) => b.tier - a.tier || a.name.localeCompare(b.name));
        break;
      case 'tier-asc':
        sorted.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'quantity':
        sorted.sort((a, b) => getOwnedCount(b.id) - getOwnedCount(a.id) || b.tier - a.tier);
        break;
    }
    return sorted;
  }, [tierFilter, categoryFilter, ownedFilter, sortBy, isOwned, getOwnedCount]);

  const handleSell = useCallback(
    (itemId: string) => {
      const ownedInstance = inventory.find((o) => o.itemId === itemId);
      if (ownedInstance) {
        sellItem(ownedInstance.instanceId);
      }
    },
    [inventory, sellItem]
  );

  return (
    <div className="game-container min-h-screen pb-20 pt-16">
      <TopBar />

      <div className="px-4 py-4">
        {/* Header + Progress */}
        <div className="mb-4">
          <h1 className="text-2xl font-title font-bold text-white mb-2">Collection</h1>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-bold text-white whitespace-nowrap">
              {uniqueItemCount}/{TOTAL_ITEMS}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-2 mb-4">
          {/* Tier filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            <FilterChip active={tierFilter === 'all'} onClick={() => setTierFilter('all')}>
              All Tiers
            </FilterChip>
            {([1, 2, 3, 4, 5, 6] as RarityTier[]).map((t) => (
              <FilterChip key={t} active={tierFilter === t} onClick={() => setTierFilter(t)}>
                {'★'.repeat(t)}
              </FilterChip>
            ))}
          </div>

          {/* Category + Owned filters */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            <FilterChip active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>
              All
            </FilterChip>
            {(Object.keys(CATEGORY_LABELS) as ItemCategory[]).map((cat) => (
              <FilterChip
                key={cat}
                active={categoryFilter === cat}
                onClick={() => setCategoryFilter(cat)}
              >
                {CATEGORY_LABELS[cat]}
              </FilterChip>
            ))}
            <span className="w-px bg-white/20 mx-1 self-stretch" />
            <FilterChip active={ownedFilter === 'owned'} onClick={() => setOwnedFilter(ownedFilter === 'owned' ? 'all' : 'owned')}>
              Owned
            </FilterChip>
            <FilterChip active={ownedFilter === 'missing'} onClick={() => setOwnedFilter(ownedFilter === 'missing' ? 'all' : 'missing')}>
              Missing
            </FilterChip>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="bg-white/10 text-white text-xs rounded-lg px-3 py-1.5 border border-white/20 outline-none"
          >
            <option value="tier-desc">Tier: High to Low</option>
            <option value="tier-asc">Tier: Low to High</option>
            <option value="name">Name A-Z</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-500 mb-3">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
        </p>

        {/* Item Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {filteredItems.map((item) => {
            const owned = isOwned(item.id);
            const count = getOwnedCount(item.id);

            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`relative rounded-xl border p-1.5 bg-gradient-to-b transition-all ${
                  owned
                    ? `${TIER_BG[item.tier]} hover:scale-105`
                    : 'from-slate-800 to-slate-900 border-slate-700/30 opacity-50'
                }`}
              >
                <img
                  src={`/items/${item.imageFilename}`}
                  alt={owned ? item.name : '???'}
                  className={`w-full aspect-square object-contain ${
                    owned ? '' : 'grayscale brightness-[0.3]'
                  }`}
                />
                {count > 1 && (
                  <div className="absolute -top-1 -right-1 bg-white/90 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {count}
                  </div>
                )}
                {!owned && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl text-gray-600 font-bold">?</span>
                  </div>
                )}
                <div className={`text-[8px] text-center mt-0.5 tracking-widest ${owned ? TIER_TEXT[item.tier] : 'text-gray-600'}`}>
                  {'★'.repeat(item.tier)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav />

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          ownedCount={getOwnedCount(selectedItem.id)}
          onSell={() => handleSell(selectedItem.id)}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
        active
          ? 'bg-purple-500 text-white'
          : 'bg-white/10 text-gray-400 hover:bg-white/15'
      }`}
    >
      {children}
    </button>
  );
}

function ItemDetailModal({
  item,
  ownedCount,
  onSell,
  onClose,
}: {
  item: GachaItem;
  ownedCount: number;
  onSell: () => void;
  onClose: () => void;
}) {
  const [showSellConfirm, setShowSellConfirm] = useState(false);
  const owned = ownedCount > 0;
  const sellPrice = SELL_PRICES[item.tier];
  const stars = '★'.repeat(item.tier);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80" />
      <div
        className={`relative max-w-sm w-full rounded-2xl border-2 bg-gradient-to-b p-6 ${TIER_BG[item.tier]} animate-modal-scale`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white/20"
        >
          ✕
        </button>

        <div className="flex justify-center mb-4">
          <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-black/30 p-3 ${owned ? '' : 'grayscale brightness-[0.3]'}`}>
            <img
              src={`/items/${item.imageFilename}`}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className={`text-center text-lg tracking-[0.3em] font-bold mb-1 ${TIER_TEXT[item.tier]}`}>
          {stars}
        </div>

        <h2 className="text-xl font-title font-bold text-white text-center mb-1">
          {owned ? item.name : '???'}
        </h2>
        <p className={`text-sm font-semibold text-center mb-2 ${TIER_TEXT[item.tier]}`}>
          {TIER_NAMES[item.tier]}
        </p>

        {owned && (
          <p className="text-xs text-gray-400 text-center mb-4 leading-relaxed">
            {item.description}
          </p>
        )}

        {owned && (
          <div className="text-center text-sm text-gray-300 mb-4">
            Owned: <span className="font-bold text-white">{ownedCount}</span>
          </div>
        )}

        {owned && ownedCount > 0 && (
          <>
            {!showSellConfirm ? (
              <button
                onClick={() => setShowSellConfirm(true)}
                className="w-full py-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-colors"
              >
                Sell for {sellPrice.toLocaleString()} Glory
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSellConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-gray-400 text-sm font-semibold hover:bg-white/15 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onSell();
                    setShowSellConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
                >
                  Confirm Sell
                </button>
              </div>
            )}
          </>
        )}

        {!owned && (
          <p className="text-center text-sm text-gray-500 italic">
            Summon or buy from the shop to unlock
          </p>
        )}
      </div>
    </div>
  );
}
