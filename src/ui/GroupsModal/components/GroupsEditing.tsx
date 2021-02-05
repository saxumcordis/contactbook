import React from "react";
import { useGroups } from "../../../service/contexts/useGroups";
import classNames from "classnames";
import { LabelWithTip } from "../../../components/LabelWithTip";
import { GroupToEdit } from "./GroupToEdit";

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

  const isActiveGroupsInit = !!activeGroups?.length;

  const renderGroupsList = (
    <ul className={styles.groupsList}>
      {groups?.map((group, i) => (
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
            [styles.header_eye_notActive]: !isActiveGroupsInit,
          })}
          onClick={() => setActiveGroups?.([])}
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
