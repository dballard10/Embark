import { useState, useEffect } from "react";
import { IconRefresh, IconSearch, IconCode } from "@tabler/icons-react";
import { fetchAllQuests, fetchAllItems, fetchAllUsers } from "../services/api";
import type { Quest } from "../types/quest.types";
import type { Item } from "../types/item.types";
import type { User } from "../types/user.types";
import QuestCard from "../components/dev/QuestCard";
import ItemCard from "../components/dev/ItemCard";
import UserCard from "../components/dev/UserCard";
import TabPanel from "../components/dev/TabPanel";

type TabType = "quests" | "items" | "users";

function DevTestPage() {
  const [activeTab, setActiveTab] = useState<TabType>("quests");
  const [quests, setQuests] = useState<Quest[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");

  const loadData = async (tab: TabType) => {
    setLoading(true);
    setError(null);

    try {
      switch (tab) {
        case "quests":
          const questData = await fetchAllQuests();
          setQuests(questData);
          break;
        case "items":
          const itemData = await fetchAllItems();
          setItems(itemData);
          break;
        case "users":
          const userData = await fetchAllUsers();
          setUsers(userData);
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const handleRefresh = () => {
    loadData(activeTab);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setFilterText("");
  };

  // Filter logic
  const filteredQuests = quests.filter(
    (q) =>
      q.title.toLowerCase().includes(filterText.toLowerCase()) ||
      q.description.toLowerCase().includes(filterText.toLowerCase()) ||
      q.tier.toString().includes(filterText)
  );

  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(filterText.toLowerCase()) ||
      i.description.toLowerCase().includes(filterText.toLowerCase()) ||
      i.rarity_tier.toString().includes(filterText)
  );

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(filterText.toLowerCase()) ||
      u.level.toString().includes(filterText)
  );

  const getDataCount = () => {
    switch (activeTab) {
      case "quests":
        return `${filteredQuests.length} / ${quests.length}`;
      case "items":
        return `${filteredItems.length} / ${items.length}`;
      case "users":
        return `${filteredUsers.length} / ${users.length}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <IconCode className="text-blue-500" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-white">Dev Test Page</h1>
              <p className="text-slate-400 text-sm">Database Explorer</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => handleTabChange("quests")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "quests"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Quests
            </button>
            <button
              onClick={() => handleTabChange("items")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "items"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Items
            </button>
            <button
              onClick={() => handleTabChange("users")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "users"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Users
            </button>
          </div>

          {/* Controls */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <IconSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder={`Filter ${activeTab}...`}
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconRefresh
                size={20}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
            <div className="px-4 py-2 bg-slate-900 rounded-lg text-slate-300 text-sm font-medium">
              Showing: {getDataCount()}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "quests" && (
          <TabPanel isLoading={loading} error={error}>
            {filteredQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
            {!loading && !error && filteredQuests.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-400">No quests found</p>
              </div>
            )}
          </TabPanel>
        )}

        {activeTab === "items" && (
          <TabPanel isLoading={loading} error={error}>
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
            {!loading && !error && filteredItems.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-400">No items found</p>
              </div>
            )}
          </TabPanel>
        )}

        {activeTab === "users" && (
          <TabPanel isLoading={loading} error={error}>
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
            {!loading && !error && filteredUsers.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-400">No users found</p>
              </div>
            )}
          </TabPanel>
        )}
      </div>
    </div>
  );
}

export default DevTestPage;
