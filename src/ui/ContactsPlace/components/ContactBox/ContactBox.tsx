import React, { useState } from "react";
import styles from "./ContactBox.module.scss";

import { Contact_person } from "../../../../types/Contact";
import { SmallAvatar } from "../../../../components/SmallAvatar";
import { ContactBoxInfo } from "./components/ContactBoxInfo";
import { ContactModal } from "../ContactModal";

type Props = {
  contact: Contact_person;
};

export const ContactBox: React.FC<Props> = ({ contact }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(!isOpen);

  const { avatar } = contact;
  return (
    <div className={styles.contactBox} onClick={() => !isOpen && handleOpen()}>
      <SmallAvatar avatar={avatar} />
      <ContactBoxInfo contact={contact} />
      <ContactModal contact={contact} isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};
