import React from "react";
import { BaseModal } from "../../components/BaseModal";
import { useGroupsModal } from "../../service/contexts/useGroupsModal";

import styles from "../ContactModal/ContactModal.module.scss";
import { GroupsModalBody } from "./components";

export const GroupsModal = () => {
  const { isOpen, open, close } = useGroupsModal();

  return (
    <BaseModal
      isOpen={isOpen!}
      setOpen={() => (isOpen ? close!() : open!())}
      className={styles.contactModal}
      closable={true}
      title="Меню управления группами"
      body={<GroupsModalBody />}
    />
  );
};
