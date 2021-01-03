import React from "react";
import styles from "./ContactsPlace.module.scss";
import { ContactsPlaceHeader } from "./components/ContactsPlaceHeader";
import { ContactBox } from "./components/ContactBox";
import { useContactBook } from "../../service/contexts";

import Fuse from "fuse.js";
import { NoData } from "../../components/NoData";
import { useNewContactModal } from "../../service/contexts/useNewContactModal";

export const ContactsPlace = () => {
  const { contactBook, searchValue, length } = useContactBook();

  const { open } = useNewContactModal();

  const searchOptions = {
    includeScore: true,
    location: 0,
    threshold: 0.5,
    distance: 100,
    keys: [
      "name",
      "surname",
      "fatherName",
      "data.phone.mobile",
      "data.phone.work",
      "data.phone.home",
    ],
  };

  const fuse = new Fuse(contactBook!, searchOptions);
  const searchedItems =
    (searchValue?.length &&
      fuse.search(searchValue || "").map((e) => e.item)) ||
    contactBook;

  const emptyContactBookMessage = (
    <div className={styles.emptyContactBookMessage}>
      <span>У Вас ещё нет контактов</span>{" "}
      <span onClick={() => open()}>Начните заполнять книжку прямо сейчас!</span>
    </div>
  );

  return (
    <div className={styles.contactsPlace}>
      <ContactsPlaceHeader currentLength={searchedItems?.length} />
      <div className={styles.contactsWrapper}>
        {searchedItems?.map((contact, index) => (
          <ContactBox key={index} contact={contact} />
        ))}
        {!length && <NoData content={emptyContactBookMessage} />}
        {!searchedItems?.length && !!length && (
          <NoData content="Ни один из контактов не удовлетворяет введённым параметрам" />
        )}
      </div>
    </div>
  );
};
