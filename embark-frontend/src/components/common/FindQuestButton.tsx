import { IconSwords, IconMap } from "@tabler/icons-react";

interface FindQuestButtonProps {
  hasActiveQuests: boolean;
  onClick?: () => void;
}

function FindQuestButton({ hasActiveQuests, onClick }: FindQuestButtonProps) {
  if (!hasActiveQuests) {
    // Large prominent button when no quests
    return (
      <div
        className="flex justify-center py-8 animate-slide-up"
        style={{ animationDelay: "0.3s" }}
      >
        <button onClick={onClick} className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative px-16 py-8 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-110">
            <div className="flex items-center gap-4">
              <IconSwords size={56} className="text-white" stroke={2} />
              <div className="text-left">
                <div className="text-4xl font-black text-white uppercase tracking-wide">
                  Find Quest
                </div>
                <div className="text-sm text-yellow-100 font-semibold">
                  Start your adventure
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Smaller button when quests exist
  return (
    <div className="flex justify-center py-6 px-4">
      <button
        onClick={onClick}
        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl shadow-xl transition-all duration-300 hover:scale-105"
      >
        <IconMap size={32} className="text-white" stroke={2} />
        <div className="text-left">
          <div className="text-xl font-bold text-white">Browse More Quests</div>
          <div className="text-xs text-blue-100">Discover new adventures</div>
        </div>
      </button>
    </div>
  );
}

export default FindQuestButton;
