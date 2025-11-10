import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import { updateUser } from "../services/api";
import TopBar from "../components/common/TopBar";
import BottomNav from "../components/common/BottomNav";
import LoadingIcon from "../components/common/LoadingIcon";
import StatisticsTab from "../components/settings/StatisticsTab";
import {
  IconUser,
  IconMail,
  IconDeviceFloppy,
  IconSettings,
  IconLogout,
  IconCheck,
  IconX,
  IconChartBar,
} from "@tabler/icons-react";
import { useItems } from "../contexts/ItemsContext";

function SettingsPage() {
  const navigate = useNavigate();
  const { selectedUser, refreshUser, isLoading: userLoading } = useUser();
  const { logout } = useAuth();
  const { itemCount: userItemCount } = useItems();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"settings" | "statistics">(
    "settings"
  );

  // Initialize form with current user data
  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.username);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleCancel = () => {
    if (selectedUser) {
      setUsername(selectedUser.username);
      setEmail(selectedUser.email);
      setIsEditing(false);
      setError("");
      setSuccessMessage("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setError("");
    setSuccessMessage("");
    setIsSaving(true);

    // Validate inputs
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long");
      setIsSaving(false);
      return;
    }

    if (username.trim().length > 50) {
      setError("Username must be less than 50 characters");
      setIsSaving(false);
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsSaving(false);
      return;
    }

    try {
      // Only send changed fields
      const updates: { username?: string; email?: string } = {};
      if (username !== selectedUser.username) {
        updates.username = username;
      }
      if (email !== selectedUser.email) {
        updates.email = email;
      }

      if (Object.keys(updates).length === 0) {
        setError("No changes to save");
        setIsSaving(false);
        return;
      }

      await updateUser(selectedUser.id, updates);
      await refreshUser();
      setSuccessMessage("Settings updated successfully!");
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err: any) {
      // Handle specific error cases
      const errorDetail = err.response?.data?.detail || err.message || "";
      let errorMessage = "Failed to update settings. Please try again.";

      // Check for unique constraint violations
      if (
        errorDetail.includes("username") &&
        (errorDetail.includes("unique") ||
          errorDetail.includes("already exists") ||
          errorDetail.includes("duplicate"))
      ) {
        errorMessage = "This username is already taken. Please choose another.";
      } else if (
        errorDetail.includes("email") &&
        (errorDetail.includes("unique") ||
          errorDetail.includes("already exists") ||
          errorDetail.includes("duplicate"))
      ) {
        errorMessage = "This email is already registered. Please use another.";
      } else if (errorDetail) {
        errorMessage = errorDetail;
      }

      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (userLoading || !selectedUser) {
    return (
      <div className="game-container flex items-center justify-center min-h-screen">
        <LoadingIcon size="large" />
      </div>
    );
  }

  const hasChanges =
    username !== selectedUser.username || email !== selectedUser.email;

  return (
    <div className="game-container">
      {/* Top Stats Bar */}
      <TopBar
        username={selectedUser.username}
        totalXP={selectedUser.total_xp}
        totalGlory={selectedUser.total_glory}
        totalItems={userItemCount}
      />

      {/* Settings Header */}
      <div className="bg-gradient-to-r from-slate-900/90 via-gray-900/90 to-slate-900/90 border-b-2 border-slate-600 fixed top-[64px] sm:top-[72px] md:top-[80px] left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Title Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-slate-600 to-gray-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <IconSettings size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" stroke={2} />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">Settings</h1>
                <p className="text-xs sm:text-sm text-slate-300/80">
                  {activeTab === "settings"
                    ? "Manage your account information"
                    : "View your progress and statistics"}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center sm:justify-start">
              <div className="flex gap-1 items-center bg-slate-950/50 backdrop-blur-sm rounded-lg p-1 border border-slate-700/30 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`min-h-[44px] px-3 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95 ${
                    activeTab === "settings"
                      ? "bg-gray-600 text-white shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/30 active:bg-slate-800/50"
                  }`}
                >
                  <IconSettings size={16} stroke={2} />
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab("statistics")}
                  className={`min-h-[44px] px-3 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95 ${
                    activeTab === "statistics"
                      ? "bg-gray-600 text-white shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/30 active:bg-slate-800/50"
                  }`}
                >
                  <IconChartBar size={16} stroke={2} />
                  Statistics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 pt-[140px] sm:pt-[150px] md:pt-[132px]">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {successMessage && activeTab === "settings" && (
            <div className="mb-4 sm:mb-6 bg-green-500/10 border border-green-500/50 rounded-xl p-3 sm:p-4 animate-slide-up">
              <div className="flex items-center gap-2">
                <IconCheck size={20} className="text-green-400" stroke={2.5} />
                <p className="text-green-400 font-semibold">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === "settings" ? (
            <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Account Information Section */}
              <div className="p-4 sm:p-6 border-b border-slate-700/50">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <IconUser size={24} className="text-blue-400" stroke={2} />
                  Account Information
                </h2>

                <form onSubmit={handleSave} className="space-y-4 sm:space-y-5">
                  {/* Username Field */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IconUser
                          size={20}
                          className="text-gray-400"
                          stroke={2}
                        />
                      </div>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setIsEditing(true);
                          setError("");
                          setSuccessMessage("");
                        }}
                        minLength={3}
                        maxLength={50}
                        required
                        placeholder="Enter username"
                        className="w-full pl-10 pr-4 py-3 text-base bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      3-50 characters
                    </p>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IconMail
                          size={20}
                          className="text-gray-400"
                          stroke={2}
                        />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsEditing(true);
                          setError("");
                          setSuccessMessage("");
                        }}
                        required
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-3 text-base bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Used for login and notifications
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
                      <IconX
                        size={20}
                        className="text-red-400 flex-shrink-0 mt-0.5"
                        stroke={2}
                      />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {isEditing && hasChanges && (
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                      >
                        {isSaving ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <IconDeviceFloppy size={20} stroke={2.5} />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                      >
                        <IconX size={20} stroke={2.5} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Account Actions Section */}
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  Account Actions
                </h2>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  <IconLogout size={20} stroke={2.5} />
                  <span>Logout</span>
                </button>
              </div>

              {/* Account Info Footer */}
              <div className="p-4 sm:p-6 bg-slate-900/50 border-t border-slate-700/50">
                <div className="text-sm text-gray-400 space-y-1">
                  <p>
                    <span className="font-semibold text-gray-300">
                      Account ID:
                    </span>{" "}
                    {selectedUser.id}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-300">
                      Member since:
                    </span>{" "}
                    {new Date(selectedUser.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <StatisticsTab />
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default SettingsPage;
