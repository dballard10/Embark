/**
 * Design Tokens - Centralized styling constants for the Embark application
 * This file contains all color schemes, gradients, animations, and design system tokens
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export interface TierColorScheme {
  from: string;
  to: string;
  border: string;
  glow: string;
  bg: string;
  text: string;
}

/**
 * Tier-based color schemes for items and UI elements
 */
export const tierColors: Record<number, TierColorScheme> = {
  1: {
    from: "gray-500",
    to: "gray-600",
    border: "gray-500/40",
    glow: "gray-500/20",
    bg: "gray-900/40",
    text: "gray-300",
  },
  2: {
    from: "green-500",
    to: "green-600",
    border: "green-500/40",
    glow: "green-500/20",
    bg: "green-900/40",
    text: "green-300",
  },
  3: {
    from: "blue-500",
    to: "blue-600",
    border: "blue-500/40",
    glow: "blue-500/20",
    bg: "blue-900/40",
    text: "blue-300",
  },
  4: {
    from: "purple-500",
    to: "purple-600",
    border: "purple-500/40",
    glow: "purple-500/20",
    bg: "purple-900/40",
    text: "purple-300",
  },
  5: {
    from: "orange-500",
    to: "red-600",
    border: "orange-500/40",
    glow: "orange-500/20",
    bg: "orange-900/40",
    text: "orange-300",
  },
  6: {
    from: "red-600",
    to: "pink-600",
    border: "red-500/40",
    glow: "red-500/20",
    bg: "red-900/40",
    text: "red-300",
  },
};

/**
 * Get tier color gradient class
 */
export function getTierGradient(tier: number): string {
  const colors = tierColors[tier] || tierColors[1];
  return `from-${colors.from} to-${colors.to}`;
}

/**
 * Get tier border color class
 */
export function getTierBorder(tier: number): string {
  const colors = tierColors[tier] || tierColors[1];
  return `border-${colors.border}`;
}

/**
 * Get tier glow color class
 */
export function getTierGlow(tier: number): string {
  const colors = tierColors[tier] || tierColors[1];
  return `shadow-${colors.glow}`;
}

/**
 * Rarity star colors
 */
export const rarityColors: Record<number, string> = {
  1: "text-gray-400",
  2: "text-green-400",
  3: "text-blue-400",
  4: "text-purple-400",
  5: "text-orange-400",
  6: "text-red-400",
};

/**
 * Stat-specific colors (glory, XP, items, etc.)
 */
export const statColors = {
  glory: {
    primary: "yellow-400",
    secondary: "yellow-300",
    bg: "yellow-900/50",
    border: "yellow-500/30",
    glow: "yellow-500/20",
  },
  xp: {
    primary: "cyan-400",
    secondary: "cyan-300",
    bg: "cyan-900/50",
    border: "cyan-500/30",
    glow: "cyan-500/20",
  },
  items: {
    primary: "green-400",
    secondary: "green-300",
    bg: "green-900/50",
    border: "green-500/30",
    glow: "green-500/20",
  },
  quests: {
    primary: "blue-400",
    secondary: "blue-300",
    bg: "blue-900/50",
    border: "blue-500/30",
    glow: "blue-500/20",
  },
};

// ============================================================================
// GRADIENT TOKENS
// ============================================================================

export const gradients = {
  // Background gradients
  cardBg: "from-slate-800/95 to-slate-900/95",
  cardBgAlt: "from-slate-900/80 to-slate-950/80",
  heroBg: "from-slate-800/95 to-slate-900/95",
  headerBg: "from-purple-600/30 via-blue-600/30 to-cyan-500/30",

  // Status gradients
  active: "from-blue-600 via-cyan-400 to-purple-500",
  completed: "from-green-500 to-emerald-600",
  expired: "from-gray-500 to-gray-600",

  // Level gradients (by level range)
  level: {
    low: "from-gray-500 to-gray-600", // < 10
    medium: "from-green-500 to-green-600", // 10-19
    high: "from-blue-500 to-blue-600", // 20-29
    veryHigh: "from-purple-500 to-purple-600", // 30-39
    epic: "from-orange-500 to-red-600", // 40-49
    legendary: "from-red-600 to-pink-600", // 50+
  },

  // Effect gradients
  shine: "from-transparent via-white/30 to-transparent",
  glow: "from-white/20 to-transparent",
  overlay: "from-transparent via-white/5 to-transparent",
};

// ============================================================================
// ANIMATION TOKENS
// ============================================================================

export const animations = {
  // Custom animation classes (defined in index.css)
  pulseSubtle: "animate-pulse-subtle",
  slideUp: "animate-slide-up",
  fadeIn: "animate-fade-in",

  // Tailwind animations
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  spin: "animate-spin",
  ping: "animate-ping",

  // Transition durations
  duration: {
    fast: "duration-150",
    normal: "duration-300",
    slow: "duration-500",
    slower: "duration-700",
  },

  // Hover effects
  hover: {
    scale: "hover:scale-[1.02]",
    scaleLarge: "hover:scale-110",
    lift: "hover:-translate-y-1",
  },
};

// ============================================================================
// SPACING & SIZING TOKENS
// ============================================================================

export const spacing = {
  // Page padding
  pagePadding: "px-4 sm:px-6 lg:px-8",
  pageY: "py-8",

  // Card padding
  cardPadding: "p-6",
  cardPaddingLarge: "p-8",

  // Grid gaps
  gridGap: "gap-6",
  gridGapSmall: "gap-4",

  // Section spacing
  sectionMargin: "mb-10",
};

export const sizing = {
  // Avatar sizes
  avatarSmall: "w-16 h-16",
  avatarMedium: "w-28 h-28 sm:w-32 sm:h-32",
  avatarLarge: "w-40 h-40",

  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 48,

  // Card heights
  cardMinHeight: "min-h-[200px]",
  questCardHeight: "min-h-[280px]",

  // Max widths
  maxWidthContainer: "max-w-7xl",
  maxWidthContent: "max-w-4xl",
};

// ============================================================================
// BORDER & SHADOW TOKENS
// ============================================================================

export const borders = {
  // Border styles
  default: "border border-slate-700/50",
  thick: "border-2",

  // Border radius
  rounded: "rounded-xl",
  roundedLarge: "rounded-2xl",
  roundedFull: "rounded-full",

  // Specific border colors
  card: "border-2 border-slate-700/50",
  active: "border-2 border-blue-500/40",
  completed: "border-2 border-green-500/40",
};

export const shadows = {
  card: "shadow-lg",
  cardHover: "hover:shadow-xl",
  glow: "drop-shadow-glow",
  inner: "shadow-inner",

  // Colored shadows
  glowBlue: "shadow-blue-500/20",
  glowGreen: "shadow-green-500/20",
  glowPurple: "shadow-purple-500/20",
  glowYellow: "shadow-yellow-500/20",
};

// ============================================================================
// TEXT TOKENS
// ============================================================================

export const typography = {
  // Headings
  h1: "text-3xl sm:text-4xl font-black text-white tracking-tight",
  h2: "text-2xl font-black text-white tracking-tight",
  h3: "text-xl font-bold text-white",
  h4: "text-lg font-bold text-white",

  // Body text
  body: "text-base text-gray-300",
  bodySmall: "text-sm text-gray-400",
  bodyLarge: "text-lg text-gray-200",

  // Labels
  label: "text-xs text-gray-400 font-semibold uppercase tracking-wide",
  labelBright: "text-xs text-gray-300 font-semibold uppercase tracking-wide",

  // Numbers/Stats
  statLarge: "text-3xl font-black text-white",
  statMedium: "text-2xl font-black text-white",
  statSmall: "text-xl font-bold text-white",

  // Effects
  dropShadow: "drop-shadow",
  dropShadowLg: "drop-shadow-lg",
};

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const components = {
  // Buttons
  button: {
    primary:
      "px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300",
    secondary:
      "px-6 py-3 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-600 transition-all duration-300",
    danger:
      "px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300",
  },

  // Cards
  card: {
    base: "bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl border-2 border-slate-700/50 shadow-lg",
    hover: "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
    clickable: "cursor-pointer",
  },

  // Badges
  badge: {
    base: "px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide",
    primary: "bg-blue-500/20 text-blue-300 border border-blue-400/30",
    success: "bg-green-500/20 text-green-300 border border-green-400/30",
    warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30",
    danger: "bg-red-500/20 text-red-300 border border-red-400/30",
  },

  // Progress bars
  progressBar: {
    container:
      "relative w-full h-8 bg-slate-800/80 rounded-full overflow-hidden border-2 border-slate-700/50 shadow-inner",
    fill: "relative h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-700 ease-out",
    shine:
      "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-subtle",
  },
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 50,
  toast: 100,
  tooltip: 200,
};
