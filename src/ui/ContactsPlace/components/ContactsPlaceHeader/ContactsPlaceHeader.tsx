import React from "react";
import styles from "./ContactsPlaceHeader.module.scss";

export const ContactsPlaceHeader = () => {
  return (
    <div className={styles.contactsPlaceHeader}>
      <span>Все контакты</span>
      <span>Показать группу</span>
      <span>Сортировка</span>
      <span>Всего контактов 0/243</span>
    </div>
  );
};
