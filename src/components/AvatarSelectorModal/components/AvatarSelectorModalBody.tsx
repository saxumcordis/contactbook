import React from "react";
import { Field } from "formik";
import {
    defaultAvatars,
    defaultAvatarsNames,
} from "../../../assets/defaultAvatars";

import styles from "./AvatarSelectorModalBody.module.scss";

export const AvatarSelectorModalBody = () => {
    return (
        <div className={styles.form}>
            {defaultAvatarsNames.map((e, i) => (
                <label className={styles.avatarBox} key={i}>
                    {defaultAvatars(e, "#55c3e8").icon}
                    <Field type="radio" name="activeAvatar" value={e} />
                </label>
            ))}
        </div>
    );
};
