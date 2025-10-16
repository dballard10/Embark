import { IconAlertCircle } from "@tabler/icons-react";
import type { ReactNode } from "react";
import LoadingIcon from "../common/LoadingIcon";

interface TabPanelProps {
  isLoading: boolean;
  error: string | null;
  children: ReactNode;
}

function TabPanel({ isLoading, error, children }: TabPanelProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingIcon size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <IconAlertCircle size={40} className="text-red-500" />
          <div>
            <p className="text-red-400 font-semibold mb-1">
              Error Loading Data
            </p>
            <p className="text-slate-400 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}

export default TabPanel;
