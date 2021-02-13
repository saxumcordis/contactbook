import React, { useCallback, useState } from "react";
import { useGroups } from "../../../service/contexts/useGroups";
import classNames from "classnames";
import { LabelWithTip } from "../../../components/LabelWithTip";
import { GroupToEdit } from "./GroupToEdit";
import Fuse from "fuse.js";

import styles from "./GroupsEditing.module.scss";
import { EyeOutlined } from "@ant-design/icons";
import { GroupsListItem } from "./GroupsListItem";

const renderGroupsDisplayingTip = (
  <ul className={styles.groupsDisplayingTip}>
    <span className={styles.groupsListItem_name_active}>
      Отображаемая группа
    </span>
    <span className={styles.groupsListItem_name_notActive}>
      Неотображаемая группа
    </span>
    <span className={styles.groupsListItem_name}>Все группы отображаются</span>
  </ul>
);

export const GroupsEditing = () => {
  const { groups, activeGroups, setActiveGroups } = useGroups();

  const [searchValue, setSearchValue] = useState("");

  const isActiveGroupsInit = !!activeGroups?.length;

  const isAllGroupsActive = groups?.length === activeGroups?.length;

  const searchedGroups = useCallback(() => {
    if (!searchValue.length) return groups;
    const searchOptions = {
      includeScore: true,
      location: 0,
      threshold: 0.5,
      distance: 100,
      keys: ["name"],
    };

    const fuse = new Fuse(groups!, searchOptions);
    return fuse.search(searchValue).map((e) => e.item);
  }, [searchValue, groups])();

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setSearchValue?.(e.target.value);
    else setSearchValue?.("");
  };

  const renderGroupsList = (
    <ul className={styles.groupsList}>
      <li className={styles.groupsListItem}>
        <input
          className={classNames(styles.groupsListItem_name, styles.findGroup)}
          placeholder="Поиск группы"
          onChange={handleSearchValue}
        />
      </li>
      {searchedGroups?.map((group, i) => (
        <GroupsListItem key={i} group={group} />
      ))}
    </ul>
  );

  return (
    <div className={styles.groupsEditing}>
      <div className={styles.header}>
        <LabelWithTip
          labelText="Редактирование групп"
          tipContent={renderGroupsDisplayingTip}
          tipContentClassName={styles.groupsDisplayingTipWrapper}
          tipPlacement={"right"}
        />
        <EyeOutlined
          className={classNames(styles.header_eye, {
            [styles.header_eye_notActive]:
              !isActiveGroupsInit || isAllGroupsActive,
          })}
          onClick={() =>
            (isActiveGroupsInit || isAllGroupsActive) && setActiveGroups?.([])
          }
          title="Показать все группы"
        />
      </div>
      <div className={styles.columnContainer}>
        {groups!.length > 0 ? (
          renderGroupsList
        ) : (
          <span className={styles.noEditableGroups}>
            Не найдено групп, доступных к редактированию
          </span>
        )}
        <GroupToEdit />
      </div>
    </div>
  );
};
