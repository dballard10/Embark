import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface JsonViewerProps {
  data: unknown;
  title?: string;
}

function JsonViewer({ data, title = "Raw JSON" }: JsonViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-3 border-t border-slate-700 pt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
        {isExpanded ? (
          <IconChevronUp size={16} />
        ) : (
          <IconChevronDown size={16} />
        )}
        <span>{title}</span>
      </button>

      {isExpanded && (
        <pre className="mt-2 p-3 bg-slate-900 rounded-lg overflow-x-auto text-xs text-slate-300 border border-slate-700">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default JsonViewer;
