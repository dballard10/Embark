import { useState, useCallback } from "react";

export interface UseModalReturn<T = string> {
  isOpen: boolean;
  selectedId: T | null;
  open: (id?: T) => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Generic hook for managing modal state
 * @param initialOpen - Whether the modal should be open initially
 * @returns Modal state and control functions
 */
export function useModal<T = string>(initialOpen = false): UseModalReturn<T> {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [selectedId, setSelectedId] = useState<T | null>(null);

  const open = useCallback((id?: T) => {
    if (id !== undefined) {
      setSelectedId(id);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Delay clearing selected ID to allow for closing animations
    setTimeout(() => setSelectedId(null), 300);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    selectedId,
    open,
    close,
    toggle,
  };
}
