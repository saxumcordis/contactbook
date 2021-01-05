import React, { useState } from "react";
import { useGroups } from "../../../../../service/contexts/useGroups";

import { ReactComponent as DeleteIcon } from "./assets/close.svg";

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

  const contactGroupsToRender = contactGroups !== "" &&
    contactGroups.split(",").map((e, i) => (
      <li key={i}>
        {e} <DeleteIcon onClick={() => handleDeleting(e)} />
      </li>
    )) || "Нет данных";

  const groupsToRender = groups?.map((e) => (
    <li>
      {e.name} <DeleteIcon />
    </li>
  ));
  return (
    <div className={styles.groups}>
      <label>Группы</label>
      <div className={styles.inputWrapper}>
      <ul>{contactGroupsToRender}</ul>
        <label>DROP</label>
      </div>
    </div>
  );
};
