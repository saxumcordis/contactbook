import React, { createRef, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useGroups } from "../../../../../service/contexts/useGroups";

import styles from "./ContactModalBodyGroupsList.module.scss";

import { ReactComponent as HandleIcon } from "./assets/close.svg";
import { SettingOutlined } from "@ant-design/icons";
import { isDotInRectangle } from "../../../../../service/calculation";

type Props = {
  contactGroups: string;
  changeGroups: (groups: string) => void;
};

export const ContactModalBodyGroupsList: React.FC<Props> = (props) => {
  const { children, contactGroups, changeGroups } = props;

  const {
    groups,
    isInGroup,
    addGroupToGroups,
    removeGroupFromGroups,
  } = useGroups();

  const [isOpen, setOpen] = useState(false);

  const containerRef = createRef<HTMLDivElement>();

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleOpen = useCallback(() => {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }

      const containerRefBounding = containerRef?.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        height: 0,
        width: 0,
      };
      const rectangle = {
        A: {
          x: containerRefBounding.left,
          y: containerRefBounding.top,
        },
        B: {
          x: containerRefBounding.left + containerRefBounding.width,
          y: containerRefBounding.top,
        },
        C: {
          x: containerRefBounding.left + containerRefBounding.width,
          y: containerRefBounding.top + containerRefBounding.height,
        },
        D: {
          x: containerRefBounding.left,
          y: containerRefBounding.top + containerRefBounding.height,
        },
      };

      if (!isDotInRectangle({ x: e.clientX, y: e.clientY }, rectangle))
        handleClose();
    },
    [isOpen, containerRef, handleClose]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleChangingGroups = useCallback(
    (groupName, state) => {
      if (state)
        changeGroups(addGroupToGroups?.(contactGroups, groupName) || "");
      else
        changeGroups(removeGroupFromGroups?.(contactGroups, groupName) || "");
    },
    [contactGroups, addGroupToGroups, removeGroupFromGroups, changeGroups]
  );

  const groupsToRender = useCallback(() => {
    return groups?.map((group, i) => {
      const isGroupInGroups = isInGroup?.(contactGroups, group.name);

      return (
        <li
          className={classNames(
            {
              [styles.addGroup]: !isGroupInGroups,
              [styles.removeGroup]: isGroupInGroups,
            },
            styles.listItem
          )}
          key={i}
        >
          <span>{group.name}</span>
          <HandleIcon
            className={classNames(styles.icon)}
            onClick={() => handleChangingGroups(group.name, !isGroupInGroups)}
          />
        </li>
      );
    });
  }, [contactGroups, isInGroup, handleChangingGroups, groups])();

  return (
    <div className={styles.component}>
      <label
        onClick={handleOpen}
        className={classNames({ [styles.activeEdit]: isOpen })}
      >
        {children}
      </label>
      {isOpen && (
        <div className={styles.listWrapper} ref={containerRef}>
          <ul className={styles.list}>{groupsToRender}</ul>
          <SettingOutlined className={styles.newGroupButton} />
        </div>
      )}
    </div>
  );
};
