import React from "react";
import { FieldGroup } from "../../../components/FieldGroup";

import { GroupsDisplaying } from "./GroupsDisplaying";
import { GroupsEditing } from "./GroupsEditing";

export const GroupsModalBody = () => {
  return (
    <div>
      <FieldGroup>
        <GroupsDisplaying />
      </FieldGroup>
      <FieldGroup>
        <GroupsEditing />
      </FieldGroup>
    </div>
  );
};
