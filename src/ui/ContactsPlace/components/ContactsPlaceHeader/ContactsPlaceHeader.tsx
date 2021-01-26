import React from "react";
import styles from "./ContactsPlaceHeader.module.scss";
import { useContactBook } from "../../../../service/contexts";
import { useGroupsModal } from "../../../../service/contexts/useGroupsModal";
import {useMedia} from "use-media";
import {handleLongString} from "../../../../service/stringHandlers";

type Props = {
  currentLength: number | undefined;
};

export const ContactsPlaceHeader: React.FC<Props> = (props) => {
  const { currentLength } = props;
  const { length } = useContactBook();
  const { open } = useGroupsModal();

  const isSmall = useMedia({ maxWidth: "450px" });

  return (
    <div className={styles.contactsPlaceHeader}>
      <span>Все контакты</span>
      <span onClick={open}>Управление группами</span>
      <span>Сортировка</span>
      <span className={styles.fixedSpan}>
        {currentLength === length
          ? `Количество контактов ${isSmall ? handleLongString(length!.toString(), 0) : length}`
          : `Найдено контактов ${isSmall ? handleLongString(currentLength!.toString(), 0) : currentLength}`}
      </span>
    </div>
  );
};
