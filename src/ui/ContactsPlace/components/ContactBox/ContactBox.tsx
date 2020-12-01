import React from "react";
import styles from "./ContactBox.module.scss";

import { Contact_person } from "../../../../types/Contact";
import { ContactAvatar } from "../../../../components/ContactAvatar";
import { ContactBoxInfo } from "./components/ContactBoxInfo"


type Props = {
  contact: Contact_person;
};

export const ContactBox: React.FC<Props> = ({ contact }) => {
  const { avatar } = contact;
  return (
    <div className={styles.contactBox}>
      <ContactAvatar avatar={avatar} />
      <ContactBoxInfo contact={contact} />
    </div>
  );
};
