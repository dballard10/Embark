import { IconHome, IconBox } from "@tabler/icons-react";
import { IoStorefrontOutline } from "react-icons/io5";
import { IconSparkles } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  color: {
    active: string;
    label: string;
    gradient: string;
  };
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: IconHome,
    path: ROUTES.HOME,
    color: {
      active: "text-cyan-400",
      label: "text-cyan-400",
      gradient: "from-cyan-500 to-blue-500",
    },
  },
  {
    id: "pull",
    label: "Summon",
    icon: IconSparkles,
    path: ROUTES.PULL,
    color: {
      active: "text-purple-400",
      label: "text-purple-400",
      gradient: "from-purple-500 to-pink-500",
    },
  },
  {
    id: "collection",
    label: "Collection",
    icon: IconBox,
    path: ROUTES.COLLECTION,
    color: {
      active: "text-green-400",
      label: "text-green-400",
      gradient: "from-green-500 to-emerald-500",
    },
  },
  {
    id: "shop",
    label: "Shop",
    icon: IoStorefrontOutline,
    path: ROUTES.SHOP,
    color: {
      active: "text-orange-400",
      label: "text-orange-400",
      gradient: "from-orange-500 to-amber-500",
    },
  },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const activePage =
    navItems.find((item) => item.path === location.pathname)?.id || "home";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-slate-900 to-slate-900/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            const isSummon = item.id === "pull";

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center py-2 sm:py-3 min-h-[64px] transition-all duration-200 active:scale-95 ${
                  isActive
                    ? item.color.active
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div
                  className={`mb-0.5 sm:mb-1 transition-transform duration-200 ${
                    isActive ? "scale-110" : "hover:scale-105"
                  } ${
                    isSummon && !isActive
                      ? "animate-pulse text-purple-400/70"
                      : ""
                  }`}
                >
                  {isSummon ? (
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                        isActive
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                          : "bg-gradient-to-br from-purple-600/50 to-pink-600/50 border border-purple-400/30"
                      }`}
                    >
                      <Icon
                        size={22}
                        className="sm:w-6 sm:h-6 text-white"
                        stroke={2}
                      />
                    </div>
                  ) : (
                    <Icon
                      size={24}
                      className="sm:w-7 sm:h-7"
                      {...(item.icon === IoStorefrontOutline
                        ? {}
                        : { stroke: 2 })}
                    />
                  )}
                </div>
                <div
                  className={`text-[10px] sm:text-xs font-semibold ${
                    isActive ? item.color.label : "text-gray-400"
                  }`}
                >
                  {item.label}
                </div>
                {isActive && (
                  <div
                    className={`absolute bottom-0 h-1 w-12 sm:w-16 bg-gradient-to-r ${item.color.gradient} rounded-t-full`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
