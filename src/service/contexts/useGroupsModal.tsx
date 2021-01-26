import React, { createContext, useCallback, useContext, useState } from "react";

type TGroupsModalContext = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const GroupsModalContext = createContext<Partial<TGroupsModalContext>>({});

export const useGroupsModal = () => useContext(GroupsModalContext);

export const GroupsModalContextProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), [setOpen]);

  const close = useCallback(() => setOpen(false), [setOpen]);

  const value = { open, close, isOpen };

  return (
    <GroupsModalContext.Provider value={value}>
      {children}
    </GroupsModalContext.Provider>
  );
};
