import { useState, useEffect, useMemo } from "react";
import { useUser } from "../../contexts/UserContext";
import { useQuestsContext } from "../../contexts/QuestsContext";
import { useItems } from "../../contexts/ItemsContext";
import { fetchAllQuests, fetchAllItems } from "../../services/api";
import type { Quest } from "../../types/quest.types";
import type { Item } from "../../types/item.types";
import LoadingIcon from "../common/LoadingIcon";
import {
  IconCalendar,
  IconTrophy,
  IconFlame,
  IconMap,
  IconBox,
  IconTrendingUp,
  IconChartBar,
} from "@tabler/icons-react";
import RarityBadge from "../common/RarityBadge";

function StatisticsTab() {
  const { selectedUser } = useUser();
  const { completedQuests } = useQuestsContext();
  const { items: userItems } = useItems();

  const [allQuests, setAllQuests] = useState<Quest[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [quests, items] = await Promise.all([
          fetchAllQuests(),
          fetchAllItems(),
        ]);
        setAllQuests(quests);
        setAllItems(items);
      } catch (err) {
        console.error("Error loading statistics data:", err);
        setError("Failed to load statistics data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate quest statistics
  const questStats = useMemo(() => {
    const completedByTier: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    const totalByTier: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    // Count completed quests by tier
    completedQuests.forEach((cq) => {
      if (cq.quest?.tier) {
        completedByTier[cq.quest.tier] =
          (completedByTier[cq.quest.tier] || 0) + 1;
      }
    });

    // Count total quests by tier
    allQuests.forEach((quest) => {
      totalByTier[quest.tier] = (totalByTier[quest.tier] || 0) + 1;
    });

    const totalCompleted = completedQuests.length;
    const totalAvailable = allQuests.length;

    // Calculate average tier
    let sumTiers = 0;
    let countTiers = 0;
    completedQuests.forEach((cq) => {
      if (cq.quest?.tier) {
        sumTiers += cq.quest.tier;
        countTiers++;
      }
    });
    const avgTier = countTiers > 0 ? sumTiers / countTiers : 0;

    // Find most completed tier
    let mostCompletedTier = 0;
    let mostCompletedCount = 0;
    Object.entries(completedByTier).forEach(([tier, count]) => {
      if (count > mostCompletedCount) {
        mostCompletedCount = count;
        mostCompletedTier = parseInt(tier);
      }
    });

    return {
      completedByTier,
      totalByTier,
      totalCompleted,
      totalAvailable,
      avgTier,
      mostCompletedTier,
      mostCompletedCount,
    };
  }, [completedQuests, allQuests]);

  // Calculate item statistics
  const itemStats = useMemo(() => {
    const collectedByTier: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    const totalByTier: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    // Count collected items by tier
    userItems.forEach((userItem) => {
      if (userItem.item?.rarity_tier) {
        collectedByTier[userItem.item.rarity_tier] =
          (collectedByTier[userItem.item.rarity_tier] || 0) + 1;
      }
    });

    // Count total items by tier
    allItems.forEach((item) => {
      totalByTier[item.rarity_tier] = (totalByTier[item.rarity_tier] || 0) + 1;
    });

    const totalCollected = userItems.length;
    const totalAvailable = allItems.length;

    // Unique items collected
    const uniqueItemIds = new Set(userItems.map((item) => item.item_id));
    const uniqueItemsCount = uniqueItemIds.size;

    return {
      collectedByTier,
      totalByTier,
      totalCollected,
      totalAvailable,
      uniqueItemsCount,
    };
  }, [userItems, allItems]);

  const tierNames: Record<number, string> = {
    1: "Novice",
    2: "Adventurer",
    3: "Warrior",
    4: "Champion",
    5: "Master",
    6: "Conqueror",
  };

  const tierColors: Record<number, string> = {
    1: "text-white",
    2: "text-green-400",
    3: "text-blue-400",
    4: "text-purple-400",
    5: "text-yellow-400",
    6: "text-red-400",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingIcon size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <IconCalendar size={24} className="text-blue-400" stroke={2} />
            Profile Information
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-400">
                Profile Creation Date
              </span>
              <p className="text-white font-semibold">
                {new Date(selectedUser.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lifetime Progress */}
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <IconTrendingUp size={24} className="text-green-400" stroke={2} />
            Lifetime Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <IconTrophy size={20} className="text-yellow-400" stroke={2} />
                <span className="text-sm text-gray-400">
                  Lifetime Glory Gained
                </span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">
                {(
                  selectedUser.lifetime_glory_gained ?? selectedUser.total_glory
                ).toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <IconFlame size={20} className="text-orange-400" stroke={2} />
                <span className="text-sm text-gray-400">
                  Lifetime XP Gained
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-400">
                {selectedUser.total_xp.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quest Statistics */}
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <IconMap size={24} className="text-blue-400" stroke={2} />
            Quest Statistics
          </h2>
          <div className="space-y-4">
            {/* Total Quests */}
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Quests Completed</span>
                <span className="text-white font-semibold">
                  {questStats.totalCompleted} / {questStats.totalAvailable}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2.5 rounded-full transition-all"
                  style={{
                    width: `${
                      questStats.totalAvailable > 0
                        ? (questStats.totalCompleted /
                            questStats.totalAvailable) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {questStats.totalAvailable > 0
                  ? (
                      (questStats.totalCompleted / questStats.totalAvailable) *
                      100
                    ).toFixed(1)
                  : 0}
                % Complete
              </p>
            </div>

            {/* Quests by Tier */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300">
                Completed by Tier
              </h3>
              {[1, 2, 3, 4, 5, 6].map((tier) => {
                const completed = questStats.completedByTier[tier] || 0;
                const total = questStats.totalByTier[tier] || 0;
                const percentage = total > 0 ? (completed / total) * 100 : 0;
                return (
                  <div
                    key={tier}
                    className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold flex items-center gap-2 ${tierColors[tier]}`}
                        >
                          <RarityBadge rarityTier={tier} rarityStars={tier} />
                          {tierNames[tier]}
                        </span>
                      </div>
                      <span className="text-white text-sm font-semibold">
                        {completed} / {total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          tier === 1
                            ? "bg-white"
                            : tier === 2
                            ? "bg-green-500"
                            : tier === 3
                            ? "bg-blue-500"
                            : tier === 4
                            ? "bg-purple-500"
                            : tier === 5
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Item Collection Statistics */}
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <IconBox size={24} className="text-green-400" stroke={2} />
            Item Collection Statistics
          </h2>
          <div className="space-y-4">
            {/* Total Items */}
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Items Collected</span>
                <span className="text-white font-semibold">
                  {itemStats.totalCollected} / {itemStats.totalAvailable}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full transition-all"
                  style={{
                    width: `${
                      itemStats.totalAvailable > 0
                        ? (itemStats.totalCollected /
                            itemStats.totalAvailable) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {itemStats.totalAvailable > 0
                  ? (
                      (itemStats.totalCollected / itemStats.totalAvailable) *
                      100
                    ).toFixed(1)
                  : 0}
                % Complete
              </p>
            </div>

            {/* Items by Tier */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300">
                Collected by Tier
              </h3>
              {[1, 2, 3, 4, 5, 6].map((tier) => {
                const collected = itemStats.collectedByTier[tier] || 0;
                const total = itemStats.totalByTier[tier] || 0;
                const percentage = total > 0 ? (collected / total) * 100 : 0;
                return (
                  <div
                    key={tier}
                    className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold flex items-center gap-2 ${tierColors[tier]}`}
                        >
                          <RarityBadge rarityTier={tier} rarityStars={tier} />
                          {tierNames[tier]}
                        </span>
                      </div>
                      <span className="text-white text-sm font-semibold">
                        {collected} / {total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          tier === 1
                            ? "bg-white"
                            : tier === 2
                            ? "bg-green-500"
                            : tier === 3
                            ? "bg-blue-500"
                            : tier === 4
                            ? "bg-purple-500"
                            : tier === 5
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <IconChartBar size={24} className="text-purple-400" stroke={2} />
            Additional Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <span className="text-sm text-gray-400">Current Level</span>
              <p className="text-2xl font-bold text-white mt-1">
                {selectedUser.level}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <span className="text-sm text-gray-400">
                Average Quest Tier Completed
              </span>
              <p className="text-2xl font-bold text-white mt-1">
                {questStats.avgTier > 0 ? questStats.avgTier.toFixed(1) : "0"}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <span className="text-sm text-gray-400">Most Completed Tier</span>
              <p className="text-2xl font-bold text-white mt-1">
                {questStats.mostCompletedTier > 0
                  ? `${tierNames[questStats.mostCompletedTier]} (${
                      questStats.mostCompletedCount
                    })`
                  : "N/A"}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <span className="text-sm text-gray-400">
                Unique Items Collected
              </span>
              <p className="text-2xl font-bold text-white mt-1">
                {itemStats.uniqueItemsCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsTab;
