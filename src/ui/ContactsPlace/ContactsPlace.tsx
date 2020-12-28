import React from "react";
import styles from "./ContactsPlace.module.scss";
import { ContactsPlaceHeader } from "./components/ContactsPlaceHeader";
import { ContactBox } from "./components/ContactBox";
import { useContactBook } from "../../service/contexts";

export const ContactsPlace = () => {
  const { contactBook } = useContactBook();

  return (
    <div className={styles.contactsPlace}>
      <ContactsPlaceHeader />
      <div className={styles.contactsWrapper}>
        {contactBook?.map((contact, index) => (
          <ContactBox key={index} contact={contact} />
        ))}
      </div>
    </div>
  );
};
