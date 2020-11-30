import React from "react";
import styles from './AddPersonButton.module.scss';

import { PlusOutlined } from "@ant-design/icons";

export const AddPersonButton = () => {
    return <div className={styles.addPersonButton}>
        <PlusOutlined />
    </div>
};