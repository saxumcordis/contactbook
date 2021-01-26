import React from "react";
import styles from "./ContactsPlaceHeader.module.scss";
import { useContactBook } from "../../../../service/contexts";
import { useGroupsModal } from "../../../../service/contexts/useGroupsModal";

type Props = {
  currentLength: number | undefined;
};

export const ContactsPlaceHeader: React.FC<Props> = (props) => {
  const { currentLength } = props;
  const { length } = useContactBook();
  const { open } = useGroupsModal();

  return (
    <div className={styles.contactsPlaceHeader}>
      <span>Все контакты</span>
      <span className={styles.pointer} onClick={open}>Управление группами</span>
      <span>Сортировка</span>
      <span className={styles.fixedSpan}>
        {currentLength === length
          ? `Количество контактов ${length}`
          : `Найдено контактов ${currentLength}`}
      </span>
    </div>
  );
};
