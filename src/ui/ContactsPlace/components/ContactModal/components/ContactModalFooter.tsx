import React, { useCallback } from "react";
import { Contact_person } from "../../../../../types/Contact";
import { Button } from "../../../../../components/Button";

import styles from "./ContactModalFooter.module.scss";
import { FormikErrors } from "formik";
import { ContactFormValues } from "../../../../../types/ContactForm";

type Props = {
  contact: Contact_person;
  dirty: boolean;
  handleCancelButton: () => void;
  errors: FormikErrors<ContactFormValues>;
};

//TODO Изменение темы кнопки по сохранению.

export const ContactModalFooter: React.FC<Props> = ({
  dirty,
  handleCancelButton,
  errors,
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
      <Button
        className={styles.button}
        htmlType="submit"
        disabled={!dirty || !!Object.keys(errors).length}
      >
        Сохранить
      </Button>
    </div>
  );
};
