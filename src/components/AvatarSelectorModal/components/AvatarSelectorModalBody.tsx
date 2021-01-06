import React from "react";

import {
  defaultAvatars,
  defaultAvatarsNames,
} from "../../../assets/defaultAvatars";

import styles from "./AvatarSelectorModalBody.module.scss";

type Props = {
  activeAvatar: string;
  setActiveAvatar: (value: string) => void;
};

export const AvatarSelectorModalBody: React.FC<Props> = (props) => {
  const { activeAvatar, setActiveAvatar } = props;

  return (
    <div className={styles.form}>
      {defaultAvatarsNames.map((e, i) => (
        <label className={styles.avatarBox} key={i}>
          {defaultAvatars(e, "#55c3e8").icon}
          <input
            type="radio"
            name="activeAvatar"
            defaultChecked={activeAvatar === e}
            value={e}
            onClick={() => setActiveAvatar(e)}
          />
        </label>
      ))}
    </div>
  );
};
