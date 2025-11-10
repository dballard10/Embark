import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user.types";
import { fetchUserById } from "../services/api";
import { useAuth } from "./AuthContext";

interface UserContextType {
  selectedUserId: string | null;
  selectedUser: User | null;
  setSelectedUserId: (userId: string) => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "embark_selected_user_id";

export function UserProvider({ children }: { children: ReactNode }) {
  const { currentUser, isAuthenticated } = useAuth();
  const [selectedUserId, setSelectedUserIdState] = useState<string | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load selected user based on authenticated user
  useEffect(() => {
    const loadInitialUser = async () => {
      if (!isAuthenticated || !currentUser) {
        setSelectedUser(null);
        setSelectedUserIdState(null);
        setIsLoading(false);
        return;
      }

      try {
        // Use the authenticated user as the selected user
        setSelectedUserIdState(currentUser.id);
        setSelectedUser(currentUser);
        localStorage.setItem(STORAGE_KEY, currentUser.id);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialUser();
  }, [currentUser, isAuthenticated]);

  const setSelectedUserId = async (userId: string) => {
    try {
      const user = await fetchUserById(userId);
      setSelectedUserIdState(userId);
      setSelectedUser(user);
      localStorage.setItem(STORAGE_KEY, userId);
    } catch (error) {
      console.error("Error setting selected user:", error);
    }
  };

  const refreshUser = async () => {
    if (!selectedUserId) return;

    try {
      const user = await fetchUserById(selectedUserId);
      setSelectedUser(user);
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        selectedUserId,
        selectedUser,
        setSelectedUserId,
        refreshUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
