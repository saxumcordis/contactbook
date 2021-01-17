import React, { useCallback } from "react";
import styles from "./ContactsPlace.module.scss";
import { ContactsPlaceHeader } from "./components/ContactsPlaceHeader";
import { ContactBox } from "./components/ContactBox";
import { useContactBook } from "../../service/contexts";

import Fuse from "fuse.js";
import { NoData } from "../../components/NoData";
import { useNewContactModal } from "../../service/contexts/useNewContactModal";
import { useGroups } from "../../service/contexts/useGroups";
import { Contact_person } from "../../types/Contact";

export const ContactsPlace = () => {
  const { contactBook, searchValue, length } = useContactBook();

  const { activeGroups } = useGroups();

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

  const contactBookFilterByGroups = useCallback(
    (contactBook: Contact_person[]) =>
      contactBook.filter((contact) => {
        const contactGroups = contact.groups?.split(",");
        return activeGroups?.length
          ? contactGroups?.some((group) => activeGroups?.includes(group))
          : 1;
      }),
    [activeGroups]
  );

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
        {contactBookFilterByGroups(searchedItems!)?.map((contact, index) => (
          <ContactBox key={index} contact={contact} />
        ))}
        {!length && <NoData content={emptyContactBookMessage} />}
        {!contactBookFilterByGroups(searchedItems!)?.length && !!length && (
          <NoData content="Ни один из контактов не удовлетворяет введённым параметрам" />
        )}
      </div>
    </div>
  );
};
