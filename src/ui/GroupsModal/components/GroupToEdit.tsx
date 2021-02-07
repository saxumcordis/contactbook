import { useGroups } from "../../../service/contexts/useGroups";
import React, {
  createRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import classNames from "classnames";
import { handleLongStringWithTip } from "../../../service/stringHandlers";
import { Group } from "../../../types/Group";
import { PopConfirm } from "../../../components/PopConfirm";
import { ReactComponent as DeleteIcon } from "../../../assets/images/delete.svg";
import {
  EyeOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

import styles from "./GroupsEditing.module.scss";

type TControlButtons = {
  isActive?: boolean;
  group?: Group;
  controls: any;
};

const ControlButtons: React.FC<TControlButtons> = ({
  isActive,
  group,
  controls,
}) => {
  const {
    handleActiveGroup,
    removeGroup,
    removeGroupFromAllContacts,
    setGroupToEdit,
    groups,
  } = useGroups();

  const handleRemovingGroup = useCallback(() => {
    removeGroup?.(group!);
    removeGroupFromAllContacts?.(group!._id.toString());
    setGroupToEdit?.(groups![0]);
  }, [removeGroup, group, removeGroupFromAllContacts, groups, setGroupToEdit]);

  return (
    <div className={styles.controlButtons}>
      <EyeOutlined
        className={classNames({
          [styles.invertedButton]: isActive,
          [styles.invertedButton_notActive]: !isActive,
        })}
        onClick={() => handleActiveGroup?.(group!._id.toString())}
      />
      {group?.editable && (
        <div className={styles.renameControls}>
          {controls.isEdit && (
            <CheckCircleOutlined
              className={classNames("confirm", {
                [styles.button]: controls.status !== "WAIT",
                [styles.button_notActive]: controls.status === "WAIT",
              })}
              onClick={() =>
                controls.status === "ADD" && controls.renameGroup()
              }
            />
          )}
          <EditOutlined
            className={styles.button}
            onClick={controls.handleEdition}
          />
        </div>
      )}
      {group?.removable && (
        <PopConfirm
          title="Удалить группу?"
          okText="Да"
          cancelText="Нет"
          onConfirm={handleRemovingGroup}
          childrenClass={styles.deletePopOver}
        >
          <DeleteIcon className={styles.button} />
        </PopConfirm>
      )}
    </div>
  );
};

export const GroupToEdit = React.memo(() => {
  const {
    groupToEdit,
    isGroupActive,
    activeGroups,
    removeGroup,
    removeGroupFromAllContacts,
    isGroupExists,
    renameGroup,
  } = useGroups();

  const [isEdit, setEdit] = useState(false);
  const [status, setStatus] = useState("WAIT");

  const isActiveGroupsInit = !!activeGroups?.length;

  const isActive = isGroupActive?.(groupToEdit!._id.toString());

  const inputRef = createRef<HTMLInputElement>();

  useLayoutEffect(() => {
    if (isEdit) inputRef.current?.focus();
  }, [isEdit, inputRef]);

  useLayoutEffect(() => {
    setEdit(false);
  }, [setEdit, groupToEdit]);

  const handleRemovingGroup = useCallback(() => {
    removeGroup?.(groupToEdit!);
    removeGroupFromAllContacts?.(groupToEdit!._id.toString());
  }, [removeGroup, groupToEdit, removeGroupFromAllContacts]);

  const handleEdition = useCallback(() => {
    setEdit(!isEdit);
  }, [setEdit, isEdit]);

  const handleNewGroupName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newGroupName = e.target.value;
      if (
        /[а-яА-Яa-zA-Z0-9]/.test(newGroupName) &&
        !isGroupExists?.(newGroupName)
      )
        setStatus("ADD");
      else setStatus("WAIT");
    },
    [setStatus, isGroupExists]
  );

  const handleGroupRename = useCallback(() => {
    const groupName = inputRef.current!.value;
    if (status === "ADD" && !isGroupExists?.(groupName)) {
      renameGroup?.(groupToEdit!, groupName.replace(/\s+/g, " ").trim());
      setEdit(false);
      setStatus("WAIT");
    }
  }, [
    inputRef,
    isGroupExists,
    setStatus,
    renameGroup,
    setEdit,
    groupToEdit,
    status,
  ]);

  const controls = {
    status: status,
    setStatus: setStatus,
    isEdit: isEdit,
    handleEdition: handleEdition,
    removeGroup: handleRemovingGroup,
    renameGroup: handleGroupRename,
  };

  return (
    <div className={styles.groupToEditContainer}>
      <span className={styles.groupToEditNameWrapper}>
        {isEdit ? (
          <input
            className={classNames(styles.groupToEditName, {
              [styles.groupToEditName_active]: isActive,
              [styles.groupToEditName_notActive]:
                !isActive && isActiveGroupsInit,
            })}
            ref={inputRef}
            defaultValue={groupToEdit!.name}
            onChange={handleNewGroupName}
          />
        ) : (
          <label
            className={classNames(styles.groupToEditName, {
              [styles.groupToEditName_active]: isActive,
              [styles.groupToEditName_notActive]:
                !isActive && isActiveGroupsInit,
            })}
          >
            {handleLongStringWithTip(groupToEdit!.name, 17)}
          </label>
        )}
      </span>
      <ControlButtons
        isActive={isActive}
        group={groupToEdit}
        controls={controls}
      />
    </div>
  );
});
