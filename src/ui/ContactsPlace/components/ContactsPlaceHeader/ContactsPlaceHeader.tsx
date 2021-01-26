import React from "react";
import styles from "./ContactsPlaceHeader.module.scss";
import { useContactBook } from "../../../../service/contexts";
import { useGroupsModal } from "../../../../service/contexts/useGroupsModal";
import { useMedia } from "use-media";
import { handleLongStringWithTip } from "../../../../service/stringHandlers";

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
      <span className={styles.pointer} onClick={open}>
        Управление группами
      </span>
      <span>Сортировка</span>
      <span className={styles.fixedSpan}>
        {currentLength === length
          ? `${
              isSmall
                ? "Кол-во контактов " +
                  handleLongStringWithTip(length!.toString(), 3)
                : "Количество контактов " + length
            }`
          : `Найдено контактов ${
              isSmall
                ? handleLongStringWithTip(currentLength!.toString(), 3)
                : currentLength
            }`}
      </span>
    </div>
  );
};
