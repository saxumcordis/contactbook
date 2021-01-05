import React from "react";

export interface AvatarProps {
  avatar: string;
  className?: string;
  size: string;
  fillColor?: string;
  onClick?: () => void;
}

export interface AvatarSelectorProps {
  avatar: string;
  setAvatar: (value: string) => void;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  changeAvatar: (avatar: string) => void;
}

export interface BaseModalProps {
  title?: React.ReactNode;
  className?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  control?: React.ReactNode;
  controlClass?: string;
}

export interface ButtonProps {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export interface FieldGroupProps {
  heading?: string;
  layout?: "column" | "row";
}

export interface LabeledInputProps {
  className?: string;
  id: string;
  labelStyle?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  labelText: string;
  labelSuffix?: React.ReactNode;
}

export interface LabeledInputWithErrorProps {
  labelError?: string;
  hiddenTip?: boolean;
  tipPlacement?: string;
}

export interface NoDataProps {
  content: React.ReactNode | string;
  className?: string;
}

export interface PopConfirmProps {
  title?: string;
  okText?: string;
  cancelText?: string;
  className?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  childrenClass?: string;
}

export interface PopOverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: string;
  trigger?: string;
  popOverClassName?: string;
  objectClassName?: string;
}
