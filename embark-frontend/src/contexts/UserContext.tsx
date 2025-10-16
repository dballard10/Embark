import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user.types";
import { fetchAllUsers, fetchUserById } from "../services/api";

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
  const [selectedUserId, setSelectedUserIdState] = useState<string | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load selected user from localStorage on mount
  useEffect(() => {
    const loadInitialUser = async () => {
      try {
        // Try to load from localStorage
        const storedUserId = localStorage.getItem(STORAGE_KEY);

        if (storedUserId) {
          try {
            const user = await fetchUserById(storedUserId);
            setSelectedUserIdState(storedUserId);
            setSelectedUser(user);
            setIsLoading(false);
            return;
          } catch (error) {
            console.error(
              "Stored user not found, loading first available user"
            );
            localStorage.removeItem(STORAGE_KEY);
          }
        }

        // If no stored user or stored user not found, get first available user
        const users = await fetchAllUsers();
        if (users.length > 0) {
          const firstUser = users[0];
          setSelectedUserIdState(firstUser.id);
          setSelectedUser(firstUser);
          localStorage.setItem(STORAGE_KEY, firstUser.id);
        }
      } catch (error) {
        console.error("Error loading initial user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialUser();
  }, []);

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
