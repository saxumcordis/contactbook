import React from "react";
import { BaseModal } from "../BaseModal";

type Props = {
  avatar: string;
  setAvatar: (value: string) => void;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const AvatarSelectorModal: React.FC<Props> = (props) => {
  const { avatar, setAvatar, isOpen, setOpen } = props;

  return (
    <BaseModal isOpen={isOpen} setOpen={setOpen} title="Выберите аватар" />
  );
};
