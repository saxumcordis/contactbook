import React from "react";
import styles from "./ContactsPlace.module.scss";
import { ContactsPlaceHeader } from "./components/ContactsPlaceHeader";
import { ContactBox } from "./components/ContactBox";
import { useContactBook } from "../../service/contexts";

import Fuse from "fuse.js";

export const ContactsPlace = () => {
  const { contactBook, searchValue } = useContactBook();

  const searchOptions = {
    includeScore: true,
    location: 0,
    threshold: 0.5,
    distance: 100,
    keys: ["name", "surname", "data.phone.mobile"],
  };

  const fuse = new Fuse(contactBook!, searchOptions);
  const searchedItems =
    (searchValue?.length &&
      fuse.search(searchValue || "").map((e) => e.item)) ||
    contactBook;

  return (
    <div className={styles.contactsPlace}>
      <ContactsPlaceHeader />
      <div className={styles.contactsWrapper}>
        {searchedItems?.map((contact, index) => (
          <ContactBox key={index} contact={contact} />
        ))}
      </div>
    </div>
  );
};
