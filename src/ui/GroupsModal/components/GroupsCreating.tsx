import React, { createRef, useCallback, useState } from "react";
import classNames from "classnames";
import { useGroups } from "../../../service/contexts/useGroups";

import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";

import styles from "./GroupsCreating.module.scss";

const TIPS: Record<string, string> = {
  INIT: "Имя должно содержать буквы/цифры и не совпадать с имеющимися",
  ADD: "Имя свободно",
  BUSY: "Имя занято",
  INVALID: "Неверный формат",
};

export const GroupsCreating = () => {
  const [status, setStatus] = useState("INIT");

  const { isGroupExists, lastId, addGroup } = useGroups();

  const inputRef = createRef<HTMLInputElement>();

  const handleClear = useCallback(() => {
    setStatus("INIT");
    if (inputRef?.current?.value) inputRef.current.value = "";
  }, [setStatus, inputRef]);
  const handleNewGroupName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newGroupName = e.target.value;
      if (!newGroupName.length) {
        setStatus("INIT");
        return;
      }
      const isBusy = isGroupExists?.(newGroupName);
      const isValid = /[а-яА-Яa-zA-Z0-9]/.test(newGroupName);
      if (isBusy) setStatus("BUSY");
      else if (isValid) setStatus("ADD");
      else setStatus("INVALID");
    },
    [setStatus, isGroupExists]
  );

  const handleAddNewGroup = useCallback(() => {
    const groupName = inputRef.current!.value;
    if (status === "ADD" && !isGroupExists?.(groupName)) {
      addGroup?.({
        _id: lastId! + 1,
        name: groupName.replace(/\s+/g, " ").trim(),
        removable: true,
        editable: true,
        countContacts: 0,
      });
      inputRef.current!.value = "";
      setStatus("INIT");
    }
  }, [status, setStatus, inputRef, isGroupExists, addGroup, lastId]);

  return (
    <div className={styles.groupsCreating}>
      <label className={styles.header}>Создание новой группы</label>
      <div className={styles.content}>
        <div className={styles.newGroupWrapper}>
          <input
            className={styles.newGroupInput}
            placeholder=". . ."
            onChange={handleNewGroupName}
            ref={inputRef}
          />
          <div className={styles.controlButtons}>
            <CheckCircleOutlined
              className={classNames(styles.button, {
                [styles.button_notActive]: status !== "ADD",
              })}
              onClick={() => status === "ADD" && handleAddNewGroup()}
            />
            <StopOutlined
              className={classNames(styles.button, {
                [styles.button_notActive]: status === "INIT",
              })}
              onClick={handleClear}
            />
          </div>
        </div>
        <label className={styles.newGroupTip}>{TIPS[status]}</label>
      </div>
    </div>
  );
};
