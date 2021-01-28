import React from "react";
import { useGroups } from "../../../service/contexts/useGroups";

import { ReactComponent as DeleteIcon } from "../../../assets/images/close.svg";
import { EditOutlined } from "@ant-design/icons";

import styles from "./ContactModalBodyGroups.module.scss";
import { ContactModalBodyGroupsList } from "./ContactModalBodyGroupsList";
import { handleLongString } from "../../../service/stringHandlers";

type Props = {
  contactGroups: string;
  changeGroups: (groups: string) => void;
};

export const ContactModalBodyGroups: React.FC<Props> = (props) => {
  const { removeGroupFromGroups, getGroupNameById } = useGroups();

  const { contactGroups, changeGroups } = props;

  const handleDeleting = (groupId: string) => {
    changeGroups(removeGroupFromGroups?.(contactGroups || "", groupId) || "");
  };

  const contactGroupsToRender =
    contactGroups !== ""
      ? contactGroups.split(",").map((id, i) => {
          const groupName = getGroupNameById?.(id);
          return (
            <li key={i}>
              <span title={groupName}>{handleLongString(groupName, 14)}</span>{" "}
              <DeleteIcon onClick={() => handleDeleting(id)} />
            </li>
          );
        })
      : null;

  return (
    <div className={styles.groupsWrapper}>
      <label className={styles.headLabel}>Группы</label>
      <div className={styles.inputWrapper}>
        {contactGroupsToRender ? (
          <ul>{contactGroupsToRender}</ul>
        ) : (
          <span>Нет данных</span>
        )}
        <ContactModalBodyGroupsList
          contactGroups={contactGroups}
          changeGroups={changeGroups}
        >
          <EditOutlined />
        </ContactModalBodyGroupsList>
      </div>
    </div>
  );
};
