import React, { useState } from "react";
import { useGroups } from "../../../service/contexts/useGroups";
import classNames from "classnames";
import { handleLongStringWithTip } from "../../../service/stringHandlers";
import { Group } from "../../../types/Group";

import { EyeOutlined } from "@ant-design/icons";

import styles from "./GroupsEditing.module.scss";

type TGroupsListItem = {
  group: Group;
};

export const GroupsListItem: React.FC<TGroupsListItem> = ({ group }) => {
  const [isSettingDisplaying, setSettingDisplaying] = useState(false);

  const {
    groups,
    activeGroups,
    isGroupActive,
    setGroupToEdit,
    handleActiveGroup,
  } = useGroups();

  const isActiveGroupsInit = !!activeGroups?.length;

  const isActive = isGroupActive?.(group._id.toString());

  const isAllGroupsActive = groups?.length === activeGroups?.length;

  return (
    <li
      className={styles.groupsListItem}
      onMouseEnter={() => setSettingDisplaying(true)}
      onMouseLeave={() => setSettingDisplaying(false)}
    >
      <span
        className={classNames(styles.groupsListItem_name, {
          [styles.groupsListItem_name_active]: isActive && !isAllGroupsActive,
          [styles.groupsListItem_name_notActive]:
            !isActive && isActiveGroupsInit,
        })}
        onClick={() => setGroupToEdit?.(group)}
      >
        {handleLongStringWithTip(group.name, 17)}
      </span>
      {(isSettingDisplaying || (isActive && !isAllGroupsActive)) && (
        <EyeOutlined
          className={classNames({
            [styles.invertedButton]: isActive,
            [styles.invertedButton_notActive]: !isActive,
          })}
          hidden={isActive!}
          onClick={() => handleActiveGroup?.(group!._id.toString())}
        />
      )}
    </li>
  );
};
