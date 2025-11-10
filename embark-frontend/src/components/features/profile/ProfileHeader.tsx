import { IconShield, IconStar, IconCalendar } from "@tabler/icons-react";
import { formatDateFriendly } from "../../../utils/dateUtils";
import { ProfileStats } from "./ProfileStats";
import { LevelProgressCard } from "./LevelProgressCard";
import type { User } from "../../../types/user.types";
import type { ProfileData } from "../../../hooks/useProfileData";
import LoadingIcon from "../../common/LoadingIcon";
import TitleBadge from "../../common/TitleBadge";
import { useAchievements } from "../../../contexts/AchievementsContext";


interface ProfileHeaderProps {
  user: User;
  profileData: ProfileData;
  itemCount: number;
  isLoadingItems: boolean;
  onNavigateToShop: () => void;
  onNavigateToVault: () => void;
}

export function ProfileHeader({
  user,
  profileData,
  itemCount,
  isLoadingItems,
  onNavigateToShop,
  onNavigateToVault,
}: ProfileHeaderProps) {
  const navigate = useNavigate();
  const { currentLevel, levelColor } = profileData;
  const { activeTitle } = useAchievements();

  return (
    <div className="mb-10 animate-slide-up">
      <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
        {/* Enhanced Background Pattern with Animation */}
        <div className="h-32 sm:h-36 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.15),transparent_50%)]"></div>
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-subtle"></div>
        </div>

        {/* Profile Info */}
        <div className="px-6 sm:px-8 pb-8 -mt-16 relative">
          {/* Enhanced Avatar with Animated Border */}
          <div className="inline-block relative mb-4">
            {/* Animated Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full blur-lg opacity-60 animate-pulse-subtle"></div>
            {/* Avatar Container */}
            <div className="relative p-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-purple-500/60 shadow-2xl">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 flex items-center justify-center shadow-inner">
                <IconShield
                  size={56}
                  className="text-white drop-shadow-lg"
                  stroke={2.5}
                />
              </div>
            </div>
            {/* Level Badge - Floating Position */}
            <div className="absolute -bottom-2 -right-2 sm:-right-3">
              <div
                className={`relative px-4 py-2 rounded-xl bg-gradient-to-r ${levelColor} border-2 border-white/40 shadow-xl`}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
                <div className="relative flex items-center gap-1.5">
                  <IconStar
                    size={18}
                    className="text-white drop-shadow"
                    fill="currentColor"
                    stroke={1.5}
                  />
                  <div className="text-center">
                    <div className="text-2xl font-black text-white drop-shadow leading-none">
                      {currentLevel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Username and Member Info */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
              {user.username}
            </h1>
            {activeTitle && (
              <div className="mb-2">
                <TitleBadge 
                  achievement={activeTitle} 
                  size="md" 
                  onClick={() => navigate('/achievements')}
                />
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <IconCalendar size={16} stroke={2} className="text-cyan-400" />
              <span className="font-medium">
                Member since {formatDateFriendly(user.created_at)}
              </span>
            </div>
          </div>

          {/* Enhanced Stats Grid - 3 columns on larger screens */}
          <ProfileStats
            totalGlory={user.total_glory}
            totalXP={user.total_xp}
            itemCount={itemCount}
            isLoadingItems={isLoadingItems}
            onNavigateToShop={onNavigateToShop}
            onNavigateToVault={onNavigateToVault}
          />

          {/* Enhanced Level Progress Section */}
          <LevelProgressCard profileData={profileData} />
        </div>
      </div>
    </div>
  );
}
