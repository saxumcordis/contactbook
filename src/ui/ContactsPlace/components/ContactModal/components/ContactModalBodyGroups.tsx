import React from "react";
import { useGroups } from "../../../../../service/contexts/useGroups";

import { ReactComponent as DeleteIcon } from "./assets/close.svg";
import { EditOutlined } from "@ant-design/icons";

import styles from "./ContactModalBodyGroups.module.scss";
import { ContactModalBodyGroupsList } from "./ContactModalBodyGroupsList";

type Props = {
  contactGroups: string;
  changeGroups: (groups: string) => void;
};

export const ContactModalBodyGroups: React.FC<Props> = (props) => {
  const { removeGroupFromGroups } = useGroups();

  const { contactGroups, changeGroups } = props;

  const handleDeleting = (group: string) => {
    changeGroups(removeGroupFromGroups?.(contactGroups || "", group) || "");
  };

  const contactGroupsToRender =
    contactGroups !== ""
      ? contactGroups.split(",").map((e, i) => (
          <li key={i}>
            <span>{e}</span> <DeleteIcon onClick={() => handleDeleting(e)} />
          </li>
        ))
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
