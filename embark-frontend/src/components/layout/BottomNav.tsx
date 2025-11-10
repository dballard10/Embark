import { IconHome, IconMap, IconBox, IconCode } from "@tabler/icons-react";
import { IoStorefrontOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
}

interface BottomNavProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: IconHome, path: ROUTES.HOME },
  { id: "quests", label: "Quests", icon: IconMap, path: ROUTES.QUESTS },
  { id: "shop", label: "Shop", icon: IoStorefrontOutline, path: ROUTES.SHOP },
  { id: "vault", label: "Vault", icon: IconBox, path: ROUTES.VAULT },
];

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDev = import.meta.env.DEV;
  const isDevPage = location.pathname === ROUTES.ADMIN;

  const handleNavClick = (item: NavItem) => {
    if (item.path) {
      navigate(item.path);
    } else {
      onNavigate?.(item.id);
    }
  };

  // Determine active page from location if currentPage is not provided
  const getActivePage = () => {
    if (currentPage) return currentPage;

    // Match location to nav items
    const matchedItem = navItems.find(
      (item) => item.path === location.pathname
    );
    return matchedItem?.id || "home";
  };

  const activePage = getActivePage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-slate-900 to-slate-900/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-1 ${isDev ? "grid-cols-5" : "grid-cols-4"}`}>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            const isVault = item.id === "vault";
            const isShop = item.id === "shop";
            const isQuests = item.id === "quests";

            // Determine active color based on item type
            let activeColor = "text-gray-400 hover:text-white";
            if (isActive) {
              if (isVault) activeColor = "text-green-400";
              else if (isShop) activeColor = "text-orange-400";
              else if (isQuests) activeColor = "text-blue-400";
              else activeColor = "text-cyan-400";
            }

            // Determine label color
            let labelColor = "text-gray-400";
            if (isActive) {
              if (isVault) labelColor = "text-green-400";
              else if (isShop) labelColor = "text-orange-400";
              else if (isQuests) labelColor = "text-blue-400";
              else labelColor = "text-cyan-400";
            }

            // Determine gradient bar color
            let gradientColor = "from-cyan-500 to-blue-500";
            if (isVault) gradientColor = "from-green-500 to-emerald-500";
            else if (isShop) gradientColor = "from-orange-500 to-amber-500";
            else if (isQuests) gradientColor = "from-blue-500 to-blue-600";

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center py-2 sm:py-3 min-h-[64px] transition-all duration-200 ${activeColor} active:scale-95`}
              >
                <div
                  className={`mb-0.5 sm:mb-1 transition-transform duration-200 ${
                    isActive ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <Icon
                    size={24}
                    className="sm:w-7 sm:h-7"
                    {...(item.icon === IoStorefrontOutline
                      ? {}
                      : { stroke: 2 })}
                  />
                </div>
                <div className={`text-[10px] sm:text-xs font-semibold ${labelColor}`}>
                  {item.label}
                </div>
                {isActive && (
                  <div
                    className={`absolute bottom-0 h-1 w-12 sm:w-16 bg-gradient-to-r ${gradientColor} rounded-t-full`}
                  ></div>
                )}
              </button>
            );
          })}

          {/* Admin Button - Only visible in development */}
          {isDev && (
            <button
              onClick={() => navigate(ROUTES.ADMIN)}
              className={`flex flex-col items-center justify-center py-2 sm:py-3 min-h-[64px] transition-all duration-200 active:scale-95 ${
                isDevPage ? "text-amber-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <div
                className={`mb-0.5 sm:mb-1 transition-transform duration-200 ${
                  isDevPage ? "scale-110" : "hover:scale-105"
                }`}
              >
                <IconCode size={24} className="sm:w-7 sm:h-7" stroke={2} />
              </div>
              <div
                className={`text-[10px] sm:text-xs font-semibold ${
                  isDevPage ? "text-amber-400" : "text-gray-400"
                }`}
              >
                Admin
              </div>
              {isDevPage && (
                <div className="absolute bottom-0 h-1 w-12 sm:w-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-full"></div>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
