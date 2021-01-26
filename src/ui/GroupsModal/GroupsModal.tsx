import React from "react";
import { BaseModal } from "../../components/BaseModal";
import { useGroupsModal } from "../../service/contexts/useGroupsModal";
import { GroupsModalBody } from "./components";
import classNames from "classnames";

import styles from "../ContactModal/ContactModal.module.scss";
import ownStyles from "./GroupsModal.module.scss";

export const GroupsModal = () => {
  const { isOpen, open, close } = useGroupsModal();

  return (
    <BaseModal
      isOpen={isOpen!}
      setOpen={() => (isOpen ? close!() : open!())}
      className={classNames(styles.contactModal, ownStyles.zIndex)}
      closable={true}
      title="Меню управления группами"
      body={<GroupsModalBody />}
    />
  );
};
