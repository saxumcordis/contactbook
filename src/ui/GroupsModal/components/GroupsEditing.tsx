import React, {
  createRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { useGroups } from "../../../service/contexts/useGroups";
import { handleLongStringWithTip } from "../../../service/stringHandlers";
import { PopConfirm } from "../../../components/PopConfirm";

import styles from "./GroupsEditing.module.scss";
import { ReactComponent as DeleteIcon } from "../../../assets/images/delete.svg";
import { EditOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Group } from "../../../types/Group";
import classNames from "classnames";

type TGroupsListItem = {
  group: Group;
};

type TGroupsSettings = {
  onEdit: () => void;
  onDelete: () => void;
  isEdit: boolean;
  status: string;
  onSubmit: () => void;
};

const GroupSettings: React.FC<TGroupsSettings> = ({
  isEdit,
  onEdit,
  onDelete,
  onSubmit,
  status,
}) => {
  return (
    <div className={styles.settingsBox}>
      {isEdit && (
        <CheckCircleOutlined
          className={classNames({
            [styles.button]: status !== "WAIT",
            [styles.button_notActive]: status === "WAIT",
          })}
          onClick={() => status !== "WAIT" && onSubmit()}
        />
      )}
      <EditOutlined className={styles.button} onClick={onEdit} />
      <PopConfirm
        title="Удалить группу?"
        okText="Да"
        cancelText="Нет"
        onConfirm={onDelete}
        childrenClass={styles.zIndex}
      >
        <DeleteIcon className={styles.button} />
      </PopConfirm>
    </div>
  );
};

const GroupsListItem: React.FC<TGroupsListItem> = ({ group }) => {
  const [isEdit, setEdit] = useState(false);
  const [status, setStatus] = useState("WAIT");

  const inputRef = createRef<HTMLInputElement>();

  const {
    renameGroup,
    removeGroup,
    isGroupExists,
    removeGroupFromAllContacts,
  } = useGroups();

  const handleRemovingGroup = useCallback(() => {
    removeGroup?.(group);
    removeGroupFromAllContacts?.(group._id.toString());
  }, [removeGroup, group, removeGroupFromAllContacts]);

  const handleEdition = useCallback(() => {
    setEdit(!isEdit);
  }, [setEdit, isEdit]);

  useLayoutEffect(() => {
    if (isEdit) inputRef.current?.focus();
  }, [isEdit, inputRef]);

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
      renameGroup?.(group, groupName.replace(/\s+/g, " ").trim());
      setEdit(false);
      setStatus("WAIT");
    }
  }, [inputRef, isGroupExists, setStatus, renameGroup, setEdit, group, status]);

  return (
    <li className={styles.groupsListItem}>
      {!isEdit && (
        <span className={styles.groupsListItem_name}>
          {handleLongStringWithTip(group.name, 14)}
        </span>
      )}
      {isEdit && (
        <input
          className={styles.input}
          onChange={handleNewGroupName}
          defaultValue={group.name}
          ref={inputRef}
        />
      )}
      {group.removable && (
        <GroupSettings
          isEdit={isEdit}
          onEdit={handleEdition}
          onDelete={handleRemovingGroup}
          onSubmit={handleGroupRename}
          status={status}
        />
      )}
    </li>
  );
};

export const GroupsEditing = () => {
  const { groups } = useGroups();

  const renderGroupsList = (
    <ul className={styles.groupsList}>
      {groups
        ?.filter((group) => group.editable)
        .map((group, i) => (
          <GroupsListItem key={i} group={group} />
        ))}
    </ul>
  );

  return (
    <div className={styles.groupsEditing}>
      <label>Редактирование групп</label>
      <div>
        {groups!.length > 1 ? (
          renderGroupsList
        ) : (
          <span className={styles.noEditableGroups}>
            Не найдено групп, доступных к редактированию
          </span>
        )}
      </div>
    </div>
  );
};
