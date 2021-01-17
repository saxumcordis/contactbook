import React, { createRef, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useGroups } from "../../../service/contexts/useGroups";
import { useMedia } from "use-media";

import styles from "./ContactModalBodyGroupsList.module.scss";

import { ReactComponent as HandleIcon } from "./assets/close.svg";
import { SettingOutlined } from "@ant-design/icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import { StopOutlined } from "@ant-design/icons";
import { isDotInRectangle } from "../../../service/calculation";
import { PopOver } from "../../../components/PopOver";
import { handleLongString } from "../../../service/stringHandlers";

type Props = {
  contactGroups: string;
  changeGroups: (groups: string) => void;
};

export const ContactModalBodyGroupsList: React.FC<Props> = (props) => {
  const { children, contactGroups, changeGroups } = props;

  const isSmall = useMedia({ maxWidth: "450px" });

  const {
    groups,
    isInGroup,
    isGroupExists,
    addGroup,
    lastId,
    addGroupToGroups,
    removeGroupFromGroups,
  } = useGroups();

  const [isOpen, setOpen] = useState(false);

  const [newGroupNameStatus, setNewGroupNameStatus] = useState("CLOSE");

  const containerRef = createRef<HTMLDivElement>();

  const inputRef = createRef<HTMLInputElement>();

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

      if (!isDotInRectangle({ x: e.clientX, y: e.clientY }, rectangle)) {
        setNewGroupNameStatus("CLOSE");
        handleClose();
      }
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

  const handleNewGroupName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newGroupName = e.target.value;
      if (
        /[а-яА-Яa-zA-Z0-9]/.test(newGroupName) &&
        !isGroupExists?.(newGroupName)
      )
        setNewGroupNameStatus("ADD");
      else setNewGroupNameStatus("WAIT");
    },
    [setNewGroupNameStatus, isGroupExists]
  );

  const handleAddNewGroup = useCallback(() => {
    const groupName = inputRef.current!.value;
    if (!isGroupExists?.(groupName)) {
      addGroup?.({ _id: lastId!, name: groupName, removable: true });
      inputRef.current!.value = "";
      setNewGroupNameStatus("CLOSE");
    }
  }, [inputRef, isGroupExists, addGroup, lastId]);

  const newGroupPopOver = useCallback(
    () => (
      <div className={styles.newGroupPopOver}>
        <input
          onChange={handleNewGroupName}
          placeholder="Название новой группы"
          ref={inputRef}
        />
        <div className={styles.newGroupButtons}>
          <CheckCircleOutlined
            className={classNames({
              [styles.notActive]: newGroupNameStatus !== "ADD",
            })}
            onClick={handleAddNewGroup}
          />
          <StopOutlined onClick={() => setNewGroupNameStatus("CLOSE")} />
        </div>
      </div>
    ),
    [newGroupNameStatus, handleNewGroupName, handleAddNewGroup, inputRef]
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
          <span title={group.name}>{handleLongString(group.name, 14)}</span>
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
          <ul
            className={classNames(styles.list, {
              [styles.hidden]: newGroupNameStatus !== "CLOSE",
            })}
          >
            {groupsToRender}
          </ul>
          <div className={styles.settingsBox}>
            <PopOver
              content={newGroupPopOver()}
              placement="left"
              objectClassName={styles.button}
              popOverClassName={styles.newGroupPopOverWrapper}
              trigger="click"
              autoClosable={false}
              status={newGroupNameStatus}
              container={
                !isSmall
                  ? { width: 216, height: 14 }
                  : { width: 166, height: 10 }
              }
            >
              <PlusCircleOutlined
                onClick={() => setNewGroupNameStatus("WAIT")}
              />
            </PopOver>
            <SettingOutlined />
          </div>
        </div>
      )}
    </div>
  );
};
