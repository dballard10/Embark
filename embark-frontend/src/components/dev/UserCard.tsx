import type { User } from "../../types/user.types";
import { formatDistanceToNow } from "date-fns";
import JsonViewer from "./JsonViewer";

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  const createdDate = new Date(user.created_at);
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <div className="bg-slate-800 rounded-lg p-5 border-2 hover:border-slate-600 transition-all duration-200 shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-white leading-tight flex-1">
          {user.username}
        </h3>
        <div className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white whitespace-nowrap">
          Level {user.level}
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
