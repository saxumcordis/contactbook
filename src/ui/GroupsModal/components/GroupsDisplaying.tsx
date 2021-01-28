import styles from "./GroupsDisplaying.module.scss";
import { LabelWithTip } from "../../../components/LabelWithTip";
import classNames from "classnames";
import React from "react";
import { useGroups } from "../../../service/contexts/useGroups";
import { handleLongString } from "../../../service/stringHandlers";

export const GroupsDisplaying = () => {
  const {
    groups,
    handleActiveGroup,
    isGroupActive,
    activeGroups,
    setActiveGroups,
  } = useGroups();

  const isActiveGroupsInit = !!activeGroups?.length;

  const renderGroupsList = (
    <ul className={styles.list}>
      {groups?.map((group, i) => {
        const isActive = isGroupActive?.(group._id.toString());
        return (
          <li
            className={classNames(styles.listItem, {
              [styles.listItem_active]: isActive,
              [styles.listItem_notActive]: !isActive && isActiveGroupsInit,
            })}
            key={i}
            onClick={() => handleActiveGroup?.(group?._id.toString())}
          >
            {handleLongString(group.name, 9)}
          </li>
        );
      })}
    </ul>
  );

  const renderGroupsDisplayingTip = (
    <ul className={styles.groupsDisplayingTip}>
      <span className={styles.listItem_active}>Отображаемая группа</span>
      <span className={styles.listItem_notActive}>Неотображаемая группа</span>
      <span className={styles.listItem}>Все группы отображаются</span>
    </ul>
  );

  return (
    <div className={styles.groupsDisplaying}>
      <LabelWithTip
        labelText="Отображаемые группы"
        tipContent={renderGroupsDisplayingTip}
        tipContentClassName={styles.groupsDisplayingTipWrapper}
        tipPlacement={"right"}
      />
      <div className={styles.listWrapper}>
        {renderGroupsList}
        <span
          className={classNames(styles.showAllGroups, {
            [styles.showAllGroups_notActive]: !isActiveGroupsInit,
          })}
          onClick={() => setActiveGroups?.([])}
        >
          Показать все
        </span>
      </div>
    </div>
  );
};
