import { useGroups } from "../../../service/contexts/useGroups";
import React, {
  createRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import classNames from "classnames";
import { Group } from "../../../types/Group";
import { PopConfirm } from "../../../components/PopConfirm";
import { ReactComponent as DeleteIcon } from "../../../assets/images/delete.svg";
import {
  EyeOutlined,
  CheckCircleOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";

import styles from "./GroupsEditing.module.scss";
import { useMedia } from "use-media";

type TControlButtons = {
  isActive?: boolean;
  group?: Group;
  controls: any;
};

const statusTips: any = {
  ADD: "Имя свободно",
  BUSY: "Имя занято",
  INVALID: "Неверный формат",
  SAME: "Текущее имя",
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
    setGroupToEditId,
    groups,
  } = useGroups();

  const handleRemovingGroup = useCallback(() => {
    removeGroup?.(group!);
    removeGroupFromAllContacts?.(group!._id.toString());
    setGroupToEditId?.(groups![0]._id);
  }, [
    removeGroup,
    group,
    removeGroupFromAllContacts,
    groups,
    setGroupToEditId,
  ]);

  const DisplayButton = () => {
    const [isVisible, setVisible] = useState(false);

    const { activeGroups } = useGroups();

    const isActiveGroupsInit = !!activeGroups?.length;
    const activeGroupsLength = activeGroups?.length;

    return (
      <li>
        <span
          className={classNames(styles.controlButtonTip, {
            [styles.controlButtonTip_notVisible]:
              !isVisible && !controls.isSmall,
          })}
        >
          {!isActiveGroupsInit
            ? "Скрыть остальные"
            : activeGroupsLength === 1 &&
              activeGroups?.[0] === controls.groupId.toString()
            ? "Показать все группы"
            : isActive
            ? "Скрыть группу"
            : "Отображать группу"}
        </span>
        <EyeOutlined
          className={classNames({
            [styles.invertedButton]: isActive,
            [styles.invertedButton_notActive]: !isActive,
          })}
          onClick={() => handleActiveGroup?.(group!._id.toString())}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        />
      </li>
    );
  };

  const RenameControls = () => {
    const [isVisible, setVisible] = useState(false);

    return (
      <li>
        <span
          className={classNames(styles.controlButtonTip, {
            [styles.controlButtonTip_notVisible]:
              !isVisible && !controls.isEdit && !controls.isSmall,
          })}
        >
          {!controls.isEdit ? "Переименовать" : statusTips[controls.status]}
        </span>
        <div className={styles.renameControls}>
          {controls.isEdit && (
            <CheckCircleOutlined
              className={classNames("confirm", {
                [styles.button]: controls.status === "ADD",
                [styles.button_notActive]: controls.status !== "ADD",
              })}
              onClick={() =>
                controls.status === "ADD" && controls.renameGroup()
              }
            />
          )}
          {!controls.isEdit ? (
            <EditOutlined
              className={styles.button}
              onClick={controls.handleEdition}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
            />
          ) : (
            <StopOutlined
              className={styles.button}
              onClick={controls.handleEdition}
            />
          )}
        </div>
      </li>
    );
  };

  const DeleteButton = () => {
    const [isVisible, setVisible] = useState(false);

    return (
      <li>
        <span
          className={classNames(styles.controlButtonTip, {
            [styles.controlButtonTip_notVisible]:
              !isVisible && !controls.isSmall,
          })}
        >
          Удалить группу
        </span>
        <PopConfirm
          title="Удалить группу?"
          okText="Да"
          cancelText="Нет"
          onConfirm={handleRemovingGroup}
          childrenClass={styles.deletePopOver}
        >
          <DeleteIcon
            className={styles.button}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          />
        </PopConfirm>
      </li>
    );
  };

  return (
    <ul className={styles.controlButtons}>
      <li className={styles.countContacts}>
        Контактов в группе: <span>{group?.countContacts}</span>
      </li>
      <DisplayButton />
      {group?.editable && <RenameControls />}
      {group?.removable && <DeleteButton />}
    </ul>
  );
};

export const GroupToEdit = React.memo(() => {
  const {
    groupToEditId,
    getGroupById,
    isGroupActive,
    activeGroups,
    removeGroup,
    removeGroupFromAllContacts,
    isGroupExists,
    renameGroup,
  } = useGroups();

  const groupToEdit = getGroupById?.(groupToEditId!.toString());

  const isSmall = useMedia({ maxWidth: "450px" });

  const [isEdit, setEdit] = useState(false);
  const [status, setStatus] = useState("SAME");

  const isActiveGroupsInit = !!activeGroups?.length;

  const isActive = isGroupActive?.(groupToEdit!._id.toString());

  const inputRef = createRef<HTMLInputElement>();

  useLayoutEffect(() => {
    isEdit ? inputRef.current?.focus() : setStatus("SAME");
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

      if (newGroupName.toLowerCase() === groupToEdit?.name.toLowerCase())
        setStatus("SAME");
      else {
        const isBusy = isGroupExists?.(newGroupName);
        const isValid = /[а-яА-Яa-zA-Z0-9]/.test(newGroupName);
        if (isBusy) setStatus("BUSY");
        else if (isValid) setStatus("ADD");
        else setStatus("INVALID");
      }
    },
    [groupToEdit, setStatus, isGroupExists]
  );

  const handleGroupRename = useCallback(() => {
    const groupName = inputRef.current!.value;
    if (status === "ADD" && !isGroupExists?.(groupName)) {
      renameGroup?.(groupToEdit!, groupName.replace(/\s+/g, " ").trim());
      setEdit(false);
      setStatus("BUSY");
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
    groupId: groupToEdit?._id,
    status: status,
    setStatus: setStatus,
    isEdit: isEdit,
    handleEdition: handleEdition,
    removeGroup: handleRemovingGroup,
    renameGroup: handleGroupRename,
    isSmall: isSmall,
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
            {groupToEdit?.name}
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
