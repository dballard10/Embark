import { IconHome, IconMap, IconBox, IconUser } from "@tabler/icons-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{
    size?: number;
    stroke?: number;
    className?: string;
  }>;
}

interface BottomNavProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: IconHome },
  { id: "quests", label: "Quests", icon: IconMap },
  { id: "vault", label: "Vault", icon: IconBox },
  { id: "profile", label: "Profile", icon: IconUser },
];

function BottomNav({ currentPage = "home", onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-slate-900 to-slate-900/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className={`flex flex-col items-center justify-center py-3 transition-all duration-200 ${
                  isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"
                }`}
              >
                <div
                  className={`mb-1 transition-transform duration-200 ${
                    isActive ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <Icon size={28} stroke={2} />
                </div>
                <div
                  className={`text-xs font-semibold ${
                    isActive ? "text-cyan-400" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </div>
                {isActive && (
                  <div className="absolute bottom-0 h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BottomNav;
