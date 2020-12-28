import React, { createContext, useCallback, useContext, useState } from "react";

type TNewContactModal = {
  close: () => void;
  open: () => void;
  isOpen: boolean;
};

const INIT = {
  close: () => {},
  open: () => {},
  isOpen: false,
};

const NewContactModal = createContext<TNewContactModal>(INIT);

export const useNewContactModal = () => useContext(NewContactModal);

export const NewContactModalProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), [setOpen]);

  const close = useCallback(() => setOpen(false), [setOpen]);

  const value = { isOpen, open, close };

  return (
    <NewContactModal.Provider value={value}>
      {children}
    </NewContactModal.Provider>
  );
};
