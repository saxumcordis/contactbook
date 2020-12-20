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
    fatherName: "Alexandrovich",
    birth: "12.12.2000",
    group: "Семья",
    data: {
      phone: {
        mobile: "89999999999",
        work: "89999999999",
        home: "999999",
      },
      address: {
        country: "Россия",
        city: "Москва",
        street: "Вавилова",
        house: "19",
        flat: "10",
        postalCode: "117312",
      }
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
        <ContactBox contact={{...contact, surname: null,fatherName:null, data: null}} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
        <ContactBox contact={contact} />
      </div>
    </div>
  );
};
