import { useState, useEffect } from "react";
import { IconX, IconDeviceFloppy } from "@tabler/icons-react";
import type { User } from "../../types/user.types";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => Promise<void>;
  user?: User | null;
}

function UserFormModal({ isOpen, onClose, onSave, user }: UserFormModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    total_glory: 0,
    total_xp: 0,
    level: 1,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        total_glory: user.total_glory,
        total_xp: user.total_xp,
        level: user.level,
      });
    } else {
      setFormData({
        username: "",
        total_glory: 0,
        total_xp: 0,
        level: 1,
      });
    }
    setError(null);
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      // For new users, only send username
      // For existing users, send all fields
      const submitData = user ? formData : { username: formData.username };

      await onSave(submitData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save user");
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
            {user ? "Edit User" : "Create New User"}
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
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          {user && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Total Glory
                  </label>
                  <input
                    type="number"
                    value={formData.total_glory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        total_glory: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={0}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Total XP
                  </label>
                  <input
                    type="number"
                    value={formData.total_xp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        total_xp: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={0}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Level
                </label>
                <input
                  type="number"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      level: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={1}
                />
              </div>
            </>
          )}

          {!user && (
            <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-3 text-blue-300 text-sm">
              New users will start with 0 glory, 0 XP, and level 1.
            </div>
          )}

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
              {isSaving ? "Saving..." : "Save User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFormModal;
