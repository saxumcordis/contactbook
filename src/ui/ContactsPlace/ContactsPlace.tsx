import React from "react";
import styles from "./ContactsPlace.module.scss";
import { ContactsPlaceHeader } from "./components/ContactsPlaceHeader";
import { ContactBox } from "./components/ContactBox";

export const ContactsPlace = () => {
  const contact = {
    _id: "1",
    name: "lala",
    avatar: "default",
    surname: null,
    fatherName: null,
    data: null,
  };

  return (
    <div className={styles.contactsPlace}>
      <ContactsPlaceHeader />
      <div className={styles.contactsWrapper}>
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
      </div>
    </div>
  );
};
