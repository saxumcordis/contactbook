import React from "react";
import styles from "./ContactsPlaceHeader.module.scss";
import { useContactBook } from "../../../../service/contexts";

export const ContactsPlaceHeader = () => {
  const { length } = useContactBook();
  return (
    <div className={styles.contactsPlaceHeader}>
      <span>Все контакты</span>
      <span>Показать группу</span>
      <span>Сортировка</span>
      <span>Всего контактов {length}</span>
    </div>
  );
};
