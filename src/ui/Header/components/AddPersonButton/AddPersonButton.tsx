import React from "react";
import styles from "./AddPersonButton.module.scss";

import { PlusOutlined } from "@ant-design/icons";
import { useNewContactModal } from "../../../../service/contexts/useNewContactModal";

export const AddPersonButton = () => {
  const { isOpen, open } = useNewContactModal();

  return (
    <div className={styles.addPersonButton} onClick={() => !isOpen && open()}>
      <PlusOutlined />
    </div>
  );
};
