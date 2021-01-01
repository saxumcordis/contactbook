import React from "react";
import styles from "./ContactsPlace.module.scss";
import { ContactsPlaceHeader } from "./components/ContactsPlaceHeader";
import { ContactBox } from "./components/ContactBox";
import { useContactBook } from "../../service/contexts";
import { isHavingSubstring } from "../../service/stringHandlers";

export const ContactsPlace = () => {
  const { contactBook, searchValue } = useContactBook();

  const searchWords = searchValue?.filter((e) => e !== "");

  const bookForSearch =
    (searchWords?.length &&
      contactBook?.filter((contact) =>
        searchWords?.reduce(
          (a, b) =>
            a *
            (isHavingSubstring(contact.name, b) ||
            isHavingSubstring(contact?.surname || "", b) ||
            isHavingSubstring(contact?.data?.phone?.mobile || "", b)
              ? 1
              : 0),
          1
        )
      )) ||
    contactBook;

  return (
    <div className={styles.contactsPlace}>
      <ContactsPlaceHeader />
      <div className={styles.contactsWrapper}>
        {bookForSearch?.map((contact, index) => (
          <ContactBox key={index} contact={contact} />
        ))}
      </div>
    </div>
  );
};
