import React, { useCallback } from "react";
import { Contact_person } from "../../../../../types/Contact";
import { Button } from "../../../../../components/Button";

import styles from "./ContactModalFooter.module.scss";

type Props = {
  contact: Contact_person;
  dirty: boolean;
  handleCancelButton: () => void;
};

//TODO Изменение темы кнопки по сохранению.

export const ContactModalFooter: React.FC<Props> = ({
  contact,
  dirty,
  handleCancelButton,
}) => {
  const handleCancel = useCallback(() => {
    handleCancelButton();
  }, [handleCancelButton]);

  return (
    <div className={styles.footer}>
      <Button
        className={styles.button}
        htmlType="button"
        disabled={!dirty}
        onClick={handleCancel}
      >
        Отменить
      </Button>
      <Button className={styles.button} htmlType="submit" disabled={!dirty}>
        Сохранить
      </Button>
    </div>
  );
};
