import { useState, useCallback } from "react";
import { purchaseItem } from "../services/api";

export interface PurchaseResult {
  success: boolean;
  newGlory?: number;
  itemPrice?: number;
}

export interface UseItemOperationsReturn {
  purchasing: boolean;
  error: Error | null;
  handlePurchaseItem: (
    userId: string,
    itemId: string
  ) => Promise<PurchaseResult>;
  clearError: () => void;
}

/**
 * Hook for managing item operations (purchase)
 * @returns Item operation handlers and loading states
 */
export function useItemOperations(): UseItemOperationsReturn {
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handlePurchaseItem = useCallback(
    async (userId: string, itemId: string): Promise<PurchaseResult> => {
      try {
        setPurchasing(true);
        setError(null);

        const result = await purchaseItem(userId, itemId);

        return {
          success: true,
          newGlory: result.new_glory,
          itemPrice: result.item_price,
        };
      } catch (err) {
        console.error("Error purchasing item:", err);
        const error =
          err instanceof Error ? err : new Error("Failed to purchase item");
        setError(error);
        return {
          success: false,
        };
      } finally {
        setPurchasing(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    purchasing,
    error,
    handlePurchaseItem,
    clearError,
  };
}
