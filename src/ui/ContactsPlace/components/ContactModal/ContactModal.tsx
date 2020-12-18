import React from "react";
import { Contact } from "../../../../types/Contact";
import { BaseModal } from "../../../../components/BaseModal";
import { BaseModalProps } from "../../../../types/Components";

import styles from "./ContactModal.module.scss";
import {ContactModalFooter, ContactModalHeader} from "./components";
import {ContactModalBody} from "./components";

type Props = Contact & BaseModalProps;

export const ContactModal: React.FC<Props> = ({ ...props }) => {
  const { isOpen, setOpen, contact } = props;


  return (
    <BaseModal
      isOpen={isOpen}
      setOpen={setOpen}
      className={styles.contactModal}
      title={<ContactModalHeader contact={contact}/>}
      body={<ContactModalBody contact={contact}/>}
      footer={<ContactModalFooter contact={contact}/>}
      closable={true}
    />
  );
};
