import React from "react";
import styles from "./ContactsPlaceHeader.module.scss";
import { useContactBook } from "../../../../service/contexts";

type Props = {
  currentLength: number | undefined;
};

export const ContactsPlaceHeader: React.FC<Props> = (props) => {
  const { currentLength } = props;
  const { length, searchValue } = useContactBook();

  return (
    <div className={styles.contactsPlaceHeader}>
      <span>Все контакты</span>
      <span>Показать группу</span>
      <span>Сортировка</span>
      <span className={styles.fixedSpan}>
        {" "}
        {searchValue === ""
          ? "Количество контактов " + length
          : "Найдено контактов " + currentLength}
      </span>
    </div>
  );
};
