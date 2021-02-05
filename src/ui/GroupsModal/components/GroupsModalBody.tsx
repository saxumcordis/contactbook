import React from "react";
import { FieldGroup } from "../../../components/FieldGroup";

// import { GroupsCreating } from "./GroupsCreating";
import { GroupsEditing } from "./GroupsEditing";

import styles from "./GroupsModalBody.module.scss";

export const GroupsModalBody = () => {
  return (
    <div className={styles.form}>
      <FieldGroup>
        <GroupsEditing />
      </FieldGroup>
        {/* @TODO <FieldGroup>
        <GroupsCreating />
      </FieldGroup>*/}
    </div>
  );
};
