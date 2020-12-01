import React from "react";
import { Contact_person } from "../../../../../../types/Contact";

import styles from "./ContactBoxInfo.module.scss";

type Props = {
  contact: Contact_person;
};

export const ContactBoxInfo: React.FC<Props> = ({ contact }) => {
  const { name, surname, data } = contact;

  const mobilePhone = data?.phone?.mobile;

  return (
    <div className={styles.contactBoxInfo}>
      <span>{name}</span>
      <span>{surname}</span>
      <span>{mobilePhone}</span>
    </div>
  );
};
