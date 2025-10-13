import { IconEdit, IconTrash, IconUserCheck } from "@tabler/icons-react";
import type { User } from "../../types/user.types";
import { formatDistanceToNow } from "date-fns";
import JsonViewer from "./JsonViewer";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSelectUser: (user: User) => void;
  isSelected: boolean;
}

function UserCard({
  user,
  onEdit,
  onDelete,
  onSelectUser,
  isSelected,
}: UserCardProps) {
  const createdDate = new Date(user.created_at);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <div
      className={`bg-slate-800 rounded-lg p-5 border-2 transition-all duration-200 shadow-lg ${
        isSelected
          ? "border-green-500 ring-2 ring-green-500/30"
          : "border-slate-700 hover:border-slate-600"
      }`}
    >
      {/* Header with Actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white leading-tight">
              {user.username}
            </h3>
            {isSelected && (
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-600 text-white">
                Active
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white whitespace-nowrap">
            Level {user.level}
          </div>
          {!isSelected && (
            <button
              onClick={() => onSelectUser(user)}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              title="Select as Test User"
            >
              <IconUserCheck size={16} />
            </button>
          )}
          <button
            onClick={() => onEdit(user)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            title="Edit User"
          >
            <IconEdit size={16} />
          </button>
          <button
            onClick={() => onDelete(user)}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="Delete User"
            disabled={isSelected}
          >
            <IconTrash size={16} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-slate-900 rounded p-2">
          <div className="text-slate-400 text-xs">Total Glory</div>
          <div className="text-amber-400 font-bold">
            {user.total_glory.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-900 rounded p-2">
          <div className="text-slate-400 text-xs">Total XP</div>
          <div className="text-blue-400 font-bold">
            {user.total_xp.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-900 rounded p-2 col-span-2">
          <div className="text-slate-400 text-xs">ID</div>
          <div className="text-slate-300 font-mono text-xs truncate">
            {user.id}
          </div>
        </div>
        <div className="bg-slate-900 rounded p-2 col-span-2">
          <div className="text-slate-400 text-xs">Created</div>
          <div className="text-slate-200 text-xs">{timeAgo}</div>
        </div>
      </div>

      <JsonViewer data={user} />
    </div>
  );
}

export default UserCard;
