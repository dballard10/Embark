// Export all hooks from a central location
export { useModal } from "./useModal";
export type { UseModalReturn } from "./useModal";

export { useUserData } from "./useUserData";
export type { UseUserDataReturn } from "./useUserData";

export { useQuests } from "./useQuests";
export type { UseQuestsReturn } from "./useQuests";

export { useItems, useAllItems, sortItemsByRarity } from "./useItems";
export type { UseItemsReturn, UseAllItemsReturn } from "./useItems";

export { useQuestOperations } from "./useQuestOperations";
export type { UseQuestOperationsReturn } from "./useQuestOperations";

export { useItemOperations } from "./useItemOperations";
export type {
  UseItemOperationsReturn,
  PurchaseResult,
} from "./useItemOperations";

export {
  useProfileData,
  getLevelColor,
  calculateDaysActive,
} from "./useProfileData";
export type { ProfileData } from "./useProfileData";
