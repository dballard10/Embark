import { useState } from "react";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

interface JsonViewerProps {
  data: unknown;
}

function JsonViewer({ data }: JsonViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 border-t border-slate-700 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors mb-2"
      >
        {isExpanded ? (
          <IconChevronDown size={16} />
        ) : (
          <IconChevronRight size={16} />
        )}
        <span className="font-semibold">Raw Data</span>
      </button>

      {isExpanded && (
        <pre className="bg-slate-950/50 border border-slate-700 rounded-lg p-3 text-xs text-slate-300 overflow-auto max-h-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default JsonViewer;
