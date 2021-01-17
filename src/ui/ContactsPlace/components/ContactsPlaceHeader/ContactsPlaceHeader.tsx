import React from "react";
import styles from "./ContactsPlaceHeader.module.scss";
import { useContactBook } from "../../../../service/contexts";
import { useGroups } from "../../../../service/contexts/useGroups";
import { PopOver } from "../../../../components/PopOver";

import { CheckOutlined } from "@ant-design/icons";
import classNames from "classnames";

type Props = {
  currentLength: number | undefined;
};

export const ContactsPlaceHeader: React.FC<Props> = (props) => {
  const { currentLength } = props;
  const { length, searchValue } = useContactBook();

  const {
    groups,
    isGroupActive,
    handleActiveGroup,
    setActiveGroups,
  } = useGroups();

  const groupsList = (
    <div className={styles.listWrapper}>
      <ul className={styles.list}>
        {groups?.map((group, i) => (
          <li
            className={styles.listItem}
            key={i}
            onClick={() => handleActiveGroup?.(group?.name)}
          >
            {group.name}
            {isGroupActive?.(group.name) && <CheckOutlined />}
          </li>
        ))}
      </ul>
      <li
        className={classNames(styles.listItem, styles.fixedListItem)}
        onClick={() => setActiveGroups?.([])}
      >
        Показать все группы
      </li>
    </div>
  );

  return (
    <div className={styles.contactsPlaceHeader}>
      <span>Все контакты</span>
      <PopOver
        content={groupsList}
        placement="bottom"
        trigger="click"
        popOverClassName={styles.popOver}
        objectClassName={styles.popOverObject}
      >
        <span>Показать группу</span>
      </PopOver>
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
