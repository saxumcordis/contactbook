import React from "react";
import { FieldGroup } from "../../../components/FieldGroup";

import { GroupsDisplaying } from "./GroupsDisplaying";
import { GroupsEditing } from "./GroupsEditing";

import styles from "./GroupsModalBody.module.scss";

export const GroupsModalBody = () => {
  return (
    <div className={styles.form}>
      <FieldGroup>
        <GroupsDisplaying />
      </FieldGroup>
      <FieldGroup>
        <GroupsEditing />
      </FieldGroup>
    </div>
  );
};
