import React, { useState } from "react";
import { BaseModal } from "../BaseModal";

import styles from "./AvatarSelectorModal.module.scss";
import {
  AvatarSelectorModalBody,
  AvatarSelectorModalFooter,
} from "./components";
import { AvatarSelectorProps } from "../../types/Components";

export const AvatarSelectorModal: React.FC<AvatarSelectorProps> = (props) => {
  const { avatar, setAvatar, isOpen, setOpen, changeAvatar } = props;

  const [activeAvatar, setActiveAvatar] = useState(avatar);

  return (
    <BaseModal
      className={styles.avatarSelectorModal}
      isOpen={isOpen}
      setOpen={setOpen}
      title="Выберите аватар"
      body={
        <AvatarSelectorModalBody
          activeAvatar={activeAvatar}
          setActiveAvatar={setActiveAvatar}
        />
      }
      footer={
        <AvatarSelectorModalFooter
          onSubmit={() => {
            setAvatar(activeAvatar);
            setOpen(false);
            changeAvatar(activeAvatar);
          }}
          handleCancelButton={() => {
            setActiveAvatar(avatar);
            setOpen(false);
          }}
        />
      }
    />
  );
};
