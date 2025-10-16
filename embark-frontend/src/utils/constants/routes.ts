/**
 * Application route constants
 */

export const ROUTES = {
  HOME: "/",
  QUESTS: "/quests",
  SHOP: "/shop",
  VAULT: "/vault",
  ADMIN: "/admin",
  QUEST_DETAILS: (id: string) => `/quest/${id}`,
} as const;

/**
 * Route metadata for navigation
 */
export interface RouteMetadata {
  path: string;
  title: string;
  icon?: string;
  requiresAuth?: boolean;
  isAdmin?: boolean;
}

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  home: {
    path: ROUTES.HOME,
    title: "Home",
    icon: "home",
  },
  quests: {
    path: ROUTES.QUESTS,
    title: "Quests",
    icon: "target",
  },
  shop: {
    path: ROUTES.SHOP,
    title: "Shop",
    icon: "shopping-bag",
  },
  vault: {
    path: ROUTES.VAULT,
    title: "Vault",
    icon: "box",
  },
  admin: {
    path: ROUTES.ADMIN,
    title: "Admin",
    icon: "shield",
    isAdmin: true,
  },
};

/**
 * Get route by name
 */
export function getRoute(name: keyof typeof ROUTE_METADATA): string {
  return ROUTE_METADATA[name]?.path || ROUTES.HOME;
}

/**
 * Navigation items for bottom nav
 */
export const NAV_ITEMS = [
  ROUTE_METADATA.home,
  ROUTE_METADATA.quests,
  ROUTE_METADATA.shop,
  ROUTE_METADATA.vault,
] as const;
