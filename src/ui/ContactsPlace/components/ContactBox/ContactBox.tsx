import React from "react";
import styles from "./ContactBox.module.scss";

import { Contact_person } from "../../../../types/Contact";
import {ContactAvatar} from "../../../../components/Avatar";

type Props = {
  contact: Contact_person;
};

export const ContactBox: React.FC<Props> = ({ contact }) => {
  const { _id, avatar, name } = contact;
  return <div className={styles.contactBox}><ContactAvatar avatar={avatar}/></div>;
};
