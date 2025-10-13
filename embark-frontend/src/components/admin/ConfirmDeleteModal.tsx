import { IconX, IconAlertTriangle } from "@tabler/icons-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting?: boolean;
}

function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting = false,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-lg shadow-2xl border-2 border-red-500/30 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <IconAlertTriangle className="text-red-500" size={28} />
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            disabled={isDeleting}
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-300">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
