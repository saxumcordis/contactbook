import React from "react";
import styles from "./ContactsPlace.module.scss";
import { ContactsPlaceHeader } from "./components/ContactsPlaceHeader";
import { ContactBox } from "./components/ContactBox";

export const ContactsPlace = () => {
  const contact = {
    _id: "1",
    name: "Alexander",
    avatar: "default",
    surname: "Alexandrov",
    fatherName: null,
    birth: null,
    group: null,
    data: {
      phone: {
        mobile: "1231",
        work: null,
        home: null,
      },
      address: null
    },
  };

  const phone =  {
    mobile: "1231",
        work: null,
        home: null,
  };

  const data = {
    phone: phone,
    address: null
  };

  return (
    <div className={styles.contactsPlace}>
      <ContactsPlaceHeader />
      <div className={styles.contactsWrapper}>
        <ContactBox contact={{...contact, surname: null}} />
        <ContactBox contact={{...contact, data: {...data, phone: {...phone, mobile: null}}}} />
        <ContactBox contact={{...contact, surname: null, data: null}} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
      </div>
    </div>
  );
};
