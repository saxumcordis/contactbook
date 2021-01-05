import React, { useState } from "react";
import { useGroups } from "../../../../../service/contexts/useGroups";

import { ReactComponent as DeleteIcon } from "./assets/close.svg";
import { DownOutlined } from "@ant-design/icons";

import styles from "./ContactModalBodyGroups.module.scss";

type Props = {
  contactGroups: string;
  changeGroups: (groups: string) => void;
};

export const ContactModalBodyGroups: React.FC<Props> = (props) => {
  const [dropped, setDropped] = useState(false);

  const {
    groups,
    handleContactGroups,
    addGroupToGroups,
    removeGroupFromGroups,
  } = useGroups();

  const { contactGroups, changeGroups } = props;

  const handleDeleting = (group: string) => {
    changeGroups(removeGroupFromGroups?.(contactGroups || "", group) || "");
  };

  const contactGroupsToRender =
    contactGroups !== ""
      ? contactGroups.split(",").map((e, i) => (
          <li key={i}>
            {e} <DeleteIcon onClick={() => handleDeleting(e)} />
          </li>
        ))
      : null;

  const groupsToRender = groups?.map((e) => (
    <li>
      {e.name} <DeleteIcon />
    </li>
  ));
  return (
    <div className={styles.groups}>
      <label className={styles.headLabel}>Группы</label>
      <div className={styles.inputWrapper}>
        {contactGroupsToRender ? (
          <ul>{contactGroupsToRender}</ul>
        ) : (
          <span>Нет данных</span>
        )}
        <label>
          <DownOutlined />
        </label>
      </div>
    </div>
  );
};
