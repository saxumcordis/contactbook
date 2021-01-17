import React from "react";
import { Contact_person } from "../../../../../types/Contact";

import styles from "./ContactBoxInfo.module.scss";
import { handleLongStringWithTip } from "../../../../../service/stringHandlers";

type Props = {
  contact: Contact_person;
};

export const ContactBoxInfo: React.FC<Props> = ({ contact }) => {
  const { name, surname, data } = contact;

  const mobilePhone = data?.phone?.mobile;

  return (
    <div className={styles.contactBoxInfo}>
      <span>{handleLongStringWithTip(name, 12)}</span>
      <span>{handleLongStringWithTip(surname, 12)}</span>
      <span>{mobilePhone}</span>
    </div>
  );
};
