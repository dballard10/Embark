import { useState, useEffect } from "react";
import {
  IconRefresh,
  IconSearch,
  IconPlus,
  IconShield,
} from "@tabler/icons-react";
import {
  fetchAllQuests,
  fetchAllItems,
  fetchAllUsers,
  createQuest,
  updateQuest,
  deleteQuest,
  createItem,
  updateItem,
  deleteItem,
  createUser,
  updateUser,
  deleteUser,
} from "../services/api";
import type { Quest } from "../types/quest.types";
import type { Item } from "../types/item.types";
import type { User } from "../types/user.types";
import QuestCard from "../components/admin/QuestCard";
import ItemCard from "../components/admin/ItemCard";
import UserCard from "../components/admin/UserCard";
import TabPanel from "../components/admin/TabPanel";
import QuestFormModal from "../components/admin/QuestFormModal";
import ItemFormModal from "../components/admin/ItemFormModal";
import UserFormModal from "../components/admin/UserFormModal";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import { useUser } from "../contexts/UserContext";
import { fetchUserItems } from "../services/api";

type TabType = "quests" | "items" | "users";

function AdminPage() {
  const { selectedUser, setSelectedUserId, refreshUser } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>("quests");
  const [quests, setQuests] = useState<Quest[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userItemCount, setUserItemCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");

  // Modal states
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: TabType;
    item: any;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Load user's item count for TopBar
  const loadUserItemCount = async () => {
    if (selectedUser?.id) {
      try {
        const userItems = await fetchUserItems(selectedUser.id);
        setUserItemCount(userItems.length);
      } catch (err) {
        console.error("Error loading user items:", err);
      }
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  useEffect(() => {
    loadUserItemCount();
  }, [selectedUser]);

  const handleRefresh = () => {
    loadData(activeTab);
    refreshUser();
    loadUserItemCount();
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setFilterText("");
  };

  // Create handlers
  const handleCreateQuest = () => {
    setEditingQuest(null);
    setQuestModalOpen(true);
  };

  const handleCreateItem = () => {
    setEditingItem(null);
    setItemModalOpen(true);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setUserModalOpen(true);
  };

  // Edit handlers
  const handleEditQuest = (quest: Quest) => {
    setEditingQuest(quest);
    setQuestModalOpen(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setItemModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserModalOpen(true);
  };

  // Delete handlers
  const handleDeleteQuest = (quest: Quest) => {
    setDeleteTarget({ type: "quests", item: quest });
    setDeleteModalOpen(true);
  };

  const handleDeleteItem = (item: Item) => {
    setDeleteTarget({ type: "items", item: item });
    setDeleteModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setDeleteTarget({ type: "users", item: user });
    setDeleteModalOpen(true);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUserId(user.id);
  };

  // Save handlers
  const handleSaveQuest = async (
    questData: Omit<Quest, "id" | "created_at">
  ) => {
    if (editingQuest) {
      await updateQuest(editingQuest.id, questData);
    } else {
      await createQuest(questData);
    }
    loadData("quests");
  };

  const handleSaveItem = async (itemData: Omit<Item, "id" | "created_at">) => {
    if (editingItem) {
      await updateItem(editingItem.id, itemData);
    } else {
      await createItem(itemData);
    }
    loadData("items");
  };

  const handleSaveUser = async (userData: any) => {
    if (editingUser) {
      await updateUser(editingUser.id, userData);
      // Refresh the selected user if we just edited them
      if (selectedUser?.id === editingUser.id) {
        await refreshUser();
      }
    } else {
      await createUser(userData);
    }
    loadData("users");
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      switch (deleteTarget.type) {
        case "quests":
          await deleteQuest(deleteTarget.item.id);
          break;
        case "items":
          await deleteItem(deleteTarget.item.id);
          break;
        case "users":
          await deleteUser(deleteTarget.item.id);
          break;
      }
      loadData(deleteTarget.type);
      setDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setIsDeleting(false);
    }
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

  const getDeleteMessage = () => {
    if (!deleteTarget) return "";
    switch (deleteTarget.type) {
      case "quests":
        return `Are you sure you want to delete the quest "${deleteTarget.item.title}"? This action cannot be undone.`;
      case "items":
        return `Are you sure you want to delete the item "${deleteTarget.item.name}"? This action cannot be undone.`;
      case "users":
        return `Are you sure you want to delete the user "${deleteTarget.item.username}"? This will also delete all their associated data. This action cannot be undone.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* TopBar */}
      {selectedUser && (
        <TopBar
          username={selectedUser.username}
          totalXP={selectedUser.total_xp}
          totalGlory={selectedUser.total_glory}
          totalItems={userItemCount}
          isLoadingItems={loading}
        />
      )}

      {/* Header */}
      <div className="pt-20 pb-24">
        <div className="bg-slate-800/50 border-b border-slate-700 fixed top-16 left-0 right-0 z-10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <IconShield className="text-amber-500" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                <p className="text-slate-400 text-sm">
                  Manage Database & Test User
                </p>
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
                onClick={
                  activeTab === "quests"
                    ? handleCreateQuest
                    : activeTab === "items"
                    ? handleCreateItem
                    : handleCreateUser
                }
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <IconPlus size={20} />
                Create New
              </button>
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
        <div className="max-w-7xl mx-auto px-4 py-6 pt-[220px]">
          {activeTab === "quests" && (
            <TabPanel isLoading={loading} error={error}>
              {filteredQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onEdit={handleEditQuest}
                  onDelete={handleDeleteQuest}
                />
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
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
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
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                  onSelectUser={handleSelectUser}
                  isSelected={selectedUser?.id === user.id}
                />
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

      {/* BottomNav */}
      <BottomNav />

      {/* Modals */}
      <QuestFormModal
        isOpen={questModalOpen}
        onClose={() => setQuestModalOpen(false)}
        onSave={handleSaveQuest}
        quest={editingQuest}
      />
      <ItemFormModal
        isOpen={itemModalOpen}
        onClose={() => setItemModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
      />
      <UserFormModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={getDeleteMessage()}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default AdminPage;
