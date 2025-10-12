import type { Quest } from "../../types/quest.types";
import { getTierColor, getTierName } from "../../utils/tierUtils";
import JsonViewer from "./JsonViewer";

interface QuestCardProps {
  quest: Quest;
}

function QuestCard({ quest }: QuestCardProps) {
  const tierColor = getTierColor(quest.tier);
  const tierName = getTierName(quest.tier);

  return (
    <div className="bg-slate-800 rounded-lg p-5 border-2 hover:border-slate-600 transition-all duration-200 shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-white leading-tight flex-1">
          {quest.title}
        </h3>
        <div
          className={`px-3 py-1 rounded-full text-xs font-bold ${tierColor} whitespace-nowrap`}
        >
          T{quest.tier} - {tierName}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
        {quest.description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-slate-900 rounded p-2">
          <div className="text-slate-400 text-xs">Glory</div>
          <div className="text-amber-400 font-bold">
            {quest.glory_reward.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-900 rounded p-2">
          <div className="text-slate-400 text-xs">XP</div>
          <div className="text-blue-400 font-bold">
            {quest.xp_reward.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-900 rounded p-2">
          <div className="text-slate-400 text-xs">Time Limit</div>
          <div className="text-slate-200 font-bold">
            {quest.time_limit_hours}h
          </div>
        </div>
        <div className="bg-slate-900 rounded p-2">
          <div className="text-slate-400 text-xs">ID</div>
          <div className="text-slate-300 font-mono text-xs truncate">
            {quest.id.slice(0, 8)}...
          </div>
        </div>
      </div>

      {/* Item Reward */}
      {quest.reward_item_id && (
        <div className="mt-3 text-xs text-slate-400">
          <span className="text-slate-500">Reward Item: </span>
          <span className="font-mono">
            {quest.reward_item_id.slice(0, 8)}...
          </span>
        </div>
      )}

      <JsonViewer data={quest} />
    </div>
  );
}

export default QuestCard;
