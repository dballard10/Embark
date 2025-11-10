import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { Achievement } from "../types/achievement.types";
import type { QuestTier } from "../types/quest.types";

type CelebrationPayload = {
  type: "special" | "standard";
  achievements: Achievement[];
  item?: any | null;
};

interface CelebrationOverlayContextType {
  showSpecial: (achievements: Achievement[], item?: any | null) => void;
  showStandard: (achievements: Achievement[], item?: any | null) => void;
  showItemThenMaybeSpecial: (
    achievements: Achievement[],
    item: any,
    hasSpecialAfter: boolean
  ) => void;
  hide: () => void;
}

const CelebrationOverlayContext =
  createContext<CelebrationOverlayContextType | null>(null);

export function CelebrationOverlayProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [active, setActive] = useState<CelebrationPayload | null>(null);
  const [toasts, setToasts] = useState<
    Array<{ id: number; achievements: Achievement[]; item?: any | null }>
  >([]);
  const [itemActive, setItemActive] = useState<{
    achievements: Achievement[];
    item: any;
    queueSpecial: boolean;
  } | null>(null);

  // Auto-dismiss standard toasts
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 6000);
    return () => clearTimeout(timer);
  }, [toasts]);

  const showSpecial = useCallback(
    (achievements: Achievement[], item?: any | null) => {
      setActive({ type: "special", achievements, item: item ?? null });
    },
    []
  );

  const showStandard = useCallback(
    (achievements: Achievement[], item?: any | null) => {
      setToasts((prev) => [
        ...prev,
        { id: Date.now(), achievements, item: item ?? null },
      ]);
    },
    []
  );

  const showItemThenMaybeSpecial = useCallback(
    (achievements: Achievement[], item: any, hasSpecialAfter: boolean) => {
      // Show bottom toast immediately if there are achievements OR an item
      if (achievements?.length || item) {
        setToasts((prev) => [
          ...prev,
          { id: Date.now(), achievements, item: item ?? null },
        ]);
      }
      setItemActive({ achievements, item, queueSpecial: hasSpecialAfter });
    },
    []
  );

  const hide = useCallback(() => setActive(null), []);

  const value = useMemo(
    () => ({ showSpecial, showStandard, showItemThenMaybeSpecial, hide }),
    [showSpecial, showStandard, showItemThenMaybeSpecial, hide]
  );

  return (
    <CelebrationOverlayContext.Provider value={value}>
      {children}
      {/* Portaled overlays */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {itemActive && (
          <ItemViewerOverlay
            payload={itemActive}
            onClose={() => {
              const next = itemActive;
              setItemActive(null);
              if (next.queueSpecial && next.achievements?.length) {
                setActive({
                  type: "special",
                  achievements: next.achievements,
                  item: next.item,
                });
              }
            }}
          />
        )}
        {active && active.type === "special" && (
          <SpecialAchievementOverlay payload={active} onClose={hide} />
        )}
        {/* Toast stack container */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center z-[110]">
          {toasts.map((t) => (
            <StandardRewardToast
              key={t.id}
              achievements={t.achievements}
              item={t.item}
            />
          ))}
        </div>
      </div>
    </CelebrationOverlayContext.Provider>
  );
}

export function useCelebrationOverlay() {
  const ctx = useContext(CelebrationOverlayContext);
  if (!ctx)
    throw new Error(
      "useCelebrationOverlay must be used within CelebrationOverlayProvider"
    );
  return ctx;
}

// Local lightweight components to avoid extra files if not present
import { IconSparkles, IconX, IconLoader } from "@tabler/icons-react";
import { getTierColor, getTierStars } from "../utils/tierUtils";
import { getItemImage } from "../utils/itemImageUtils";

function SpecialAchievementOverlay({
  payload,
  onClose,
}: {
  payload: CelebrationPayload;
  onClose: () => void;
}) {
  const primary = payload.achievements[0];
  const isSpecial =
    primary.tier === 6 ||
    primary.achievement_type === "questline" ||
    primary.achievement_type === "tier";
  const gradientClass = isSpecial
    ? "from-red-600 to-pink-600"
    : `${getTierColor(primary.color_tier as QuestTier)}`;

  return (
    <div className="absolute inset-0 pointer-events-auto z-[105]">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative w-full max-w-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden animate-modal-scale">
          <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={onClose}
          >
            <IconX size={24} />
          </button>
          <div className="bg-slate-900/90">
            {/* Confetti-esque background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="animate-confetti opacity-30" />
            </div>
            <div className="relative p-8 text-center">
              <div className="inline-flex items-center gap-2 text-yellow-300 text-lg font-semibold">
                <IconSparkles /> Congratulations!
              </div>
              <h2 className="mt-2 text-3xl font-extrabold text-white">
                Special Achievement Unlocked
              </h2>
              <div
                className={`mt-4 inline-block px-5 py-2 rounded-full bg-gradient-to-r ${gradientClass} text-white font-bold border border-white/30 shadow-lg`}
              >
                {primary.title}
              </div>
              <p className="mt-3 text-gray-200 max-w-xl mx-auto">
                {primary.description}
              </p>

              {payload.item?.item && (
                <div className="mt-6 text-gray-200">
                  You also received:{" "}
                  <span className="font-semibold text-white">
                    {payload.item.item.name}
                  </span>
                </div>
              )}

              <div className="mt-8 flex justify-center gap-3">
                <a
                  href="/achievements"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
                >
                  View Achievements
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemViewerOverlay({
  payload,
  onClose,
}: {
  payload: { achievements: Achievement[]; item: any; queueSpecial: boolean };
  onClose: () => void;
}) {
  const uiItem = payload.item?.item ?? payload.item; // support raw item or wrapped userItem
  const rarity = uiItem?.rarity_tier ?? uiItem?.tier ?? 1;
  const title = uiItem?.name ?? "Item";
  const description = uiItem?.description ?? "";
  const resolvedUrl = getItemImage(uiItem?.name, uiItem?.image_url) || "";

  const [isLoading, setIsLoading] = useState<boolean>(!!resolvedUrl);
  const [showImage, setShowImage] = useState<boolean>(false);

  // Preload with timeout; fall back to text-only if slow or error
  useEffect(() => {
    let timeoutId: any;
    let img: HTMLImageElement | null = null;
    let loaded = false;
    if (resolvedUrl) {
      setIsLoading(true);
      img = new Image();
      (img as any).decoding = "async";
      (img as any).loading = "eager";
      (img as any).fetchPriority = "high";
      img.onload = () => {
        loaded = true;
        if (timeoutId) clearTimeout(timeoutId);
        setShowImage(true);
        setIsLoading(false);
      };
      img.onerror = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setShowImage(false);
        setIsLoading(false);
      };
      img.src = resolvedUrl;
      timeoutId = setTimeout(() => {
        // If still loading after 2500ms, proceed without image but do not hide a loaded image
        if (!loaded) {
          setIsLoading(false);
          // leave showImage as-is (false) so text-only is shown
        }
      }, 2500);
    } else {
      // No URL; ensure we don't spin
      setIsLoading(false);
      setShowImage(false);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      img = null;
    };
  }, [resolvedUrl]);

  // ESC key support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="absolute inset-0 pointer-events-auto z-[105]">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <button
        className="absolute top-4 right-4 z-20 text-white/70 hover:text-white bg-black/50 rounded-full p-2"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close item viewer"
      >
        <IconX size={28} />
      </button>
      <div
        className="absolute inset-0 z-10 flex items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-3xl animate-modal-scale">
          {/* Card with badge and image */}
          <div
            className={`relative rounded-2xl overflow-hidden border-2 ${"border-white/20"} shadow-2xl bg-slate-900/80`}
          >
            {/* Rarity badge */}
            <div className="absolute top-4 right-4 z-10">
              <div
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r ${getTierColor(
                  rarity as QuestTier
                )} border border-white/30 text-sm font-bold text-white shadow-lg`}
              >
                {getTierStars(rarity as QuestTier)}
              </div>
            </div>

            {/* Image area */}
            <div className="h-[60vh] min-h-[360px] bg-gradient-to-br from-slate-800/40 to-slate-900/60 flex items-center justify-center">
              {isLoading && (
                <IconLoader size={32} className="text-white/70 animate-spin" />
              )}
              {!isLoading && showImage && resolvedUrl && (
                <img
                  src={resolvedUrl}
                  alt={title}
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                  className="max-h-[56vh] max-w-full object-contain p-6"
                />
              )}
              {!isLoading && !showImage && <div className="text-white/40" />}
            </div>

            {/* Info */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-extrabold text-white">{title}</h3>
              {description && (
                <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement toast area remains managed below by provider */}
    </div>
  );
}

function StandardRewardToast({
  achievements,
  item,
}: {
  achievements: Achievement[];
  item?: any | null;
}) {
  const primary = achievements[0];
  const isSpecial =
    primary?.tier === 6 ||
    primary?.achievement_type === "questline" ||
    primary?.achievement_type === "tier";
  const gradientClass = isSpecial
    ? "from-red-600 to-pink-600"
    : `${getTierColor((primary?.color_tier ?? 1) as QuestTier)}`;

  return (
    <div
      className={`pointer-events-auto rounded-xl border border-white/20 bg-slate-900/90 shadow-xl px-4 py-3 w-[min(92vw,560px)] animate-slide-up`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${gradientClass} border border-white/30 flex items-center justify-center text-white`}
        >
          <IconSparkles size={20} />
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold">Rewards Unlocked</div>
          <div className="text-sm text-gray-300">
            {achievements.length > 0 && (
              <div>
                Achievement:{" "}
                <span className="text-white font-medium">{primary.title}</span>
                {achievements.length > 1
                  ? ` +${achievements.length - 1} more`
                  : ""}
              </div>
            )}
            {item?.item && (
              <div>
                Item:{" "}
                <span className="text-white font-medium">{item.item.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CelebrationOverlayContext;

/* Minimal animations */
// Tailwind utility usage assumed; add keyframes via global CSS if needed
