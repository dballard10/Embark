import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}

function ImageViewer({ isOpen, onClose, imageUrl, altText }: ImageViewerProps) {
  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevent body scroll when viewer is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={handleCloseClick}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70 z-10"
        aria-label="Close image viewer"
      >
        <IconX size={32} />
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-[95vw] max-h-[95vh] animate-modal-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={altText}
          className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}

export default ImageViewer;

