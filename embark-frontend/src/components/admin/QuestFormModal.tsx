import { useState, useEffect } from "react";
import { IconX, IconDeviceFloppy } from "@tabler/icons-react";
import type { Quest } from "../../types/quest.types";

interface QuestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (questData: Omit<Quest, "id" | "created_at">) => Promise<void>;
  quest?: Quest | null;
}

function QuestFormModal({
  isOpen,
  onClose,
  onSave,
  quest,
}: QuestFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
    tier: 1,
    glory_reward: 0,
    xp_reward: 0,
    time_limit_hours: 24,
    reward_item_id: "",
    enemy_name: "",
    enemy_type: "",
    enemy_description: "",
    enemy_image_url: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (quest) {
      setFormData({
        title: quest.title,
        description: quest.description,
        topic: quest.topic,
        tier: quest.tier,
        glory_reward: quest.glory_reward,
        xp_reward: quest.xp_reward,
        time_limit_hours: quest.time_limit_hours,
        reward_item_id: quest.reward_item_id || "",
        enemy_name: quest.enemy_name,
        enemy_type: quest.enemy_type,
        enemy_description: quest.enemy_description,
        enemy_image_url: quest.enemy_image_url || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        topic: "",
        tier: 1,
        glory_reward: 0,
        xp_reward: 0,
        time_limit_hours: 24,
        reward_item_id: "",
        enemy_name: "",
        enemy_type: "",
        enemy_description: "",
        enemy_image_url: "",
      });
    }
    setError(null);
  }, [quest, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const submitData = {
        ...formData,
        reward_item_id: formData.reward_item_id || null,
      };
      await onSave(submitData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save quest");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-800 rounded-lg shadow-2xl border-2 border-slate-600 max-w-2xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">
            {quest ? "Edit Quest" : "Create New Quest"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            disabled={isSaving}
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-900/30 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              required
              maxLength={1000}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Topic *
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={100}
              placeholder="e.g., Running, Reading, Meditation"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tier (1-6) *
              </label>
              <input
                type="number"
                value={formData.tier}
                onChange={(e) =>
                  setFormData({ ...formData, tier: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={1}
                max={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Time Limit (hours) *
              </label>
              <input
                type="number"
                value={formData.time_limit_hours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    time_limit_hours: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={1}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Glory Reward *
              </label>
              <input
                type="number"
                value={formData.glory_reward}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    glory_reward: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                XP Reward *
              </label>
              <input
                type="number"
                value={formData.xp_reward}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    xp_reward: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Reward Item ID (optional)
            </label>
            <input
              type="text"
              value={formData.reward_item_id}
              onChange={(e) =>
                setFormData({ ...formData, reward_item_id: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="UUID of reward item"
            />
          </div>

          {/* Enemy Section */}
          <div className="border-t border-slate-600 pt-4 mt-4">
            <h3 className="text-lg font-bold text-white mb-4">
              Enemy Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Enemy Name *
                </label>
                <input
                  type="text"
                  value={formData.enemy_name}
                  onChange={(e) =>
                    setFormData({ ...formData, enemy_name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength={100}
                  placeholder="e.g., Swift Shadow Goblin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Enemy Type *
                </label>
                <input
                  type="text"
                  value={formData.enemy_type}
                  onChange={(e) =>
                    setFormData({ ...formData, enemy_type: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength={50}
                  placeholder="e.g., Goblin Scout"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Enemy Description *
              </label>
              <textarea
                value={formData.enemy_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    enemy_description: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                required
                maxLength={1000}
                placeholder="Describe the enemy and its characteristics..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Enemy Image URL (optional)
              </label>
              <input
                type="text"
                value={formData.enemy_image_url}
                onChange={(e) =>
                  setFormData({ ...formData, enemy_image_url: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL to enemy image"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <IconDeviceFloppy size={20} />
              {isSaving ? "Saving..." : "Save Quest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuestFormModal;
