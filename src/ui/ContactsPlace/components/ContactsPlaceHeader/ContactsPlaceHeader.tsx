import React, { useCallback } from "react";
import { useContactBook } from "../../../../service/contexts";
import { useGroupsModal } from "../../../../service/contexts/useGroupsModal";
import { useMedia } from "use-media";
import { handleLongStringWithTip } from "../../../../service/stringHandlers";
import { useGroups } from "../../../../service/contexts/useGroups";
import classNames from "classnames";

import { EyeOutlined } from "@ant-design/icons";

import styles from "./ContactsPlaceHeader.module.scss";

type Props = {
  currentLength: number | undefined;
};

export const ContactsPlaceHeader: React.FC<Props> = (props) => {
  const { currentLength } = props;
  const { length, searchValue, setSearchValue } = useContactBook();
  const { open } = useGroupsModal();
  const { activeGroups, setActiveGroups } = useGroups();

  const isSmall = useMedia({ maxWidth: "450px" });

  const isContactBookNotFiltered =
    currentLength === length && !activeGroups?.length && !searchValue;

  const clearContactBookFilters = useCallback(() => {
    setSearchValue?.("");
    setActiveGroups?.([]);
  }, [setSearchValue, setActiveGroups]);

  return (
    <div className={styles.contactsPlaceHeader}>
      <EyeOutlined
        className={classNames(styles.showAllContactsButton, {
          [styles.showAllContactsButton_notActive]: isContactBookNotFiltered,
        })}
        onClick={() => !isContactBookNotFiltered && clearContactBookFilters()}
      />
      <span className={styles.pointer} onClick={open}>
        Управление группами
      </span>
      <span style={{opacity: 0.3}}>Настройки</span>
      <span className={styles.fixedSpan}>
        {isContactBookNotFiltered
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
