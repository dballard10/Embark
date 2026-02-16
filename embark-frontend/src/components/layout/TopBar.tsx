import { IconTrophy, IconBox, IconSettings } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useGacha } from "../../contexts/GachaContext";
import { TOTAL_ITEMS } from "../../data/itemCatalog";
import { useState } from "react";

export function TopBar() {
  const navigate = useNavigate();
  const { glory, uniqueItemCount, resetAll } = useGacha();
  const [showReset, setShowReset] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    if (confirmReset) {
      resetAll();
      setShowReset(false);
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Logo / Title - Left */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span className="text-xl sm:text-2xl font-title font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                EMBARK
              </span>
            </button>

            {/* Stats - Right */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              {/* Glory */}
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 border border-yellow-600/50 rounded-full px-2 sm:px-4 py-2 min-h-[44px] shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <IconTrophy
                  size={20}
                  className="sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0"
                  stroke={2}
                />
                <span className="font-bold text-yellow-300 text-sm sm:text-lg whitespace-nowrap">
                  {glory.toLocaleString()}
                </span>
              </button>

              {/* Collection */}
              <button
                onClick={() => navigate("/collection")}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-600/50 rounded-full px-2 sm:px-4 py-2 min-h-[44px] shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <IconBox
                  size={20}
                  className="sm:w-6 sm:h-6 text-green-400 flex-shrink-0"
                  stroke={2}
                />
                <span className="font-bold text-green-300 text-sm sm:text-lg whitespace-nowrap">
                  {uniqueItemCount}/{TOTAL_ITEMS}
                </span>
              </button>

              {/* Settings */}
              <button
                onClick={() => {
                  setShowReset(true);
                  setConfirmReset(false);
                }}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center hover:bg-slate-700/80 active:bg-slate-600/80 transition-colors shadow-lg min-h-[44px]"
              >
                <IconSettings
                  size={20}
                  className="sm:w-6 sm:h-6 text-gray-300"
                  stroke={2}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Dialog */}
      {showReset && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setShowReset(false);
            setConfirmReset(false);
          }}
        >
          <div
            className="bg-slate-800 border border-white/20 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-2">Settings</h3>
            <p className="text-gray-400 text-sm mb-6">
              Reset all data including your collection, Glory, and pull history.
              This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReset(false);
                  setConfirmReset(false);
                }}
                className="flex-1 py-3 rounded-xl bg-slate-700 text-gray-300 font-semibold hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                  confirmReset
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "bg-red-900/50 text-red-300 border border-red-600/50 hover:bg-red-800/50"
                }`}
              >
                {confirmReset ? "Confirm Reset" : "Reset All Data"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
