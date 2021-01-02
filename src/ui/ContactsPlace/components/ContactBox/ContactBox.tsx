import React, { useCallback, useState } from "react";
import styles from "./ContactBox.module.scss";

import { Contact_person } from "../../../../types/Contact";
import { Avatar } from "../../../../components/Avatar";
import { ContactBoxInfo } from "./components/ContactBoxInfo";
import { ContactModal } from "../ContactModal";

type Props = {
  contact: Contact_person;
};

export const ContactBox: React.FC<Props> = ({ contact }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), [setOpen]);

  const { avatar } = contact;
  return (
    <div className={styles.contactBox} onClick={() => !isOpen && handleOpen()}>
      <Avatar avatar={avatar} size={"small"} className={styles.avatar}/>
      <ContactBoxInfo contact={contact} />
      <ContactModal contact={contact} isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};
