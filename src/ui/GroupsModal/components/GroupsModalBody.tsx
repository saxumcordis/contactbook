import React from "react";
import { useGroups } from "../../../service/contexts/useGroups";
import { FieldGroup } from "../../../components/FieldGroup";
import { LabelWithTip } from "../../../components/LabelWithTip";
import classNames from "classnames";

import styles from "./GroupsModalBody.module.scss";
import { handleLongString } from "../../../service/stringHandlers";

export const GroupsModalBody = () => {
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
        const isActive = isGroupActive?.(group.name);
        return (
          <li
            className={classNames(styles.listItem, {
              [styles.listItem_active]: isActive,
              [styles.listItem_notActive]: !isActive && isActiveGroupsInit,
            })}
            key={i}
            onClick={() => handleActiveGroup?.(group?.name)}
          >
            {handleLongString(group.name, 9)}
          </li>
        );
      })}
    </ul>
  );

  const renderDisplayedGroupsTip = (
    <ul className={styles.displayedGroupsTip}>
      <span className={styles.listItem_active}>Отображаемая группа</span>
      <span className={styles.listItem_notActive}>Неотображаемая группа</span>
      <span className={styles.listItem}>Все группы отображаются</span>
    </ul>
  );

  return (
    <div>
      <FieldGroup>
        <div className={styles.displayedGroups}>
          <LabelWithTip
            labelText="Отображаемые группы"
            tipContent={renderDisplayedGroupsTip}
            tipContentClassName={styles.displayedGroupsTipWrapper}
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
      </FieldGroup>
    </div>
  );
};
