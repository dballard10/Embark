import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import type { UserItem } from "../types/item.types";
import { fetchUserItems } from "../services/api";
import { useUser } from "./UserContext";
import { sortItemsByRarity } from "../hooks/useItems";

interface ItemsContextType {
  items: UserItem[];
  itemCount: number;
  topItems: UserItem[];
  loading: boolean;
  error: Error | null;
  refreshItems: () => Promise<void>;
  isOwnedItem: (itemId: string) => boolean;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const { selectedUser } = useUser();
  const [items, setItems] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadItems = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const userItems = await fetchUserItems(userId);
      setItems(userItems);
    } catch (err) {
      console.error("Error loading items:", err);
      setError(err instanceof Error ? err : new Error("Failed to load items"));
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Load items when selected user changes
  useEffect(() => {
    if (selectedUser?.id) {
      loadItems(selectedUser.id);
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [selectedUser?.id]);

  const refreshItems = async () => {
    if (selectedUser?.id) {
      await loadItems(selectedUser.id);
    }
  };

  // Computed values
  const itemCount = items.length;

  const topItems = useMemo(() => {
    const sorted = sortItemsByRarity(items);
    return sorted.slice(0, 4);
  }, [items]);

  const isOwnedItem = (itemId: string): boolean => {
    return items.some((item) => item.item_id === itemId);
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        itemCount,
        topItems,
        loading,
        error,
        refreshItems,
        isOwnedItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
}
