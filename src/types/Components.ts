import React from "react";

export interface BaseModalProps {
  title?: React.ReactNode;
  className?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

export interface NoDataProps {
  content: React.ReactNode | string;
  className?: string;
}
