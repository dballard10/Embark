import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "../types/user.types";
import {
  login as loginApi,
  signup as signupApi,
} from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  signup: (email: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "embark_auth_email";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load authentication state on mount
  useEffect(() => {
    const loadAuth = async () => {
      try {
        // Try to restore session from localStorage
        const storedEmail = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedEmail) {
          try {
            const user = await loginApi(storedEmail);
            setCurrentUser(user);
          } catch (error) {
            console.error("Stored session invalid, clearing:", error);
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Error loading authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = async (email: string) => {
    try {
      const user = await loginApi(email);
      setCurrentUser(user);
      localStorage.setItem(AUTH_STORAGE_KEY, email);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (email: string, username: string) => {
    try {
      const user = await signupApi(email, username);
      setCurrentUser(user);
      localStorage.setItem(AUTH_STORAGE_KEY, email);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
