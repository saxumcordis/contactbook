import React from "react";
import styles from "./ContactsPlaceHeader.module.scss";
import { useContactBook } from "../../../../service/contexts";
import { useGroupsModal } from "../../../../service/contexts/useGroupsModal";
import { useMedia } from "use-media";
import { handleLongStringWithTip } from "../../../../service/stringHandlers";
import { useGroups } from "../../../../service/contexts/useGroups";

type Props = {
  currentLength: number | undefined;
};

export const ContactsPlaceHeader: React.FC<Props> = (props) => {
  const { currentLength } = props;
  const { length, searchValue } = useContactBook();
  const { open } = useGroupsModal();
  const { activeGroups } = useGroups();

  const isSmall = useMedia({ maxWidth: "450px" });

  return (
    <div className={styles.contactsPlaceHeader}>
      <span>Все контакты</span>
      <span className={styles.pointer} onClick={open}>
        Управление группами
      </span>
      <span>Сортировка</span>
      <span className={styles.fixedSpan}>
        {currentLength === length && !activeGroups?.length && !searchValue
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
