import { IconLoader2 } from "@tabler/icons-react";
import { ReactNode } from "react";

interface TabPanelProps {
  isLoading: boolean;
  error: string | null;
  children: ReactNode;
}

function TabPanel({ isLoading, error, children }: TabPanelProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <IconLoader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-slate-400">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md">
          <h3 className="text-red-400 font-bold mb-2">Error Loading Data</h3>
          <p className="text-slate-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

export default TabPanel;
