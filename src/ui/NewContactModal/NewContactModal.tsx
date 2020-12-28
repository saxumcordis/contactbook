import React, { useMemo } from "react";

import { Form, Formik } from "formik";
import styles from "../ContactsPlace/components/ContactModal/ContactModal.module.scss";
import { BaseModal } from "../../components/BaseModal";
import { NewContactModalBody, NewContactModalFooter } from "./components";
import { ContactFormValues } from "../../types/ContactForm";
import { useNewContactModal } from "../../service/contexts/useNewContactModal";
import { useContactBook } from "../../service/contexts";

export const NewContactModal: React.FC = () => {
  const { isOpen, close } = useNewContactModal();

  const { addContact, length } = useContactBook();

  const initialValues = useMemo<ContactFormValues>(() => {
    return {
      name: "",
      surname: "",
      fatherName: "",
      avatar: "",
      birth: "",
      group: "",
      country: "",
      city: "",
      street: "",
      house: "",
      flat: "",
      postalCode: "",
      mobile: "",
      work: "",
      home: "",
    };
  }, []);

  const handleSubmit = (values: ContactFormValues) => {
    const contact = {
      _id: length! + 1,
      name: values?.name,
      surname: values?.surname,
      fatherName: values?.fatherName,
      birth: values?.birth,
      avatar: values?.avatar || "default",
      group: values?.group,
      data: {
        phone: {
          mobile: values.mobile,
          work: values.work,
          home: values.home,
        },
        address: {
          country: values.country,
          city: values.city,
          street: values.street,
          house: values.house,
          flat: values.flat,
          postalCode: values.postalCode,
        },
      },
    };
    addContact?.(contact);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values)}
      render={({ dirty, resetForm }) => (
        <Form className={styles.form}>
          <BaseModal
            isOpen={isOpen || false}
            setOpen={(isOpen) => close()}
            className={styles.contactModal}
            title="Новый контакт"
            body={<NewContactModalBody />}
            footer={
              <NewContactModalFooter
                dirty={dirty}
                handleCancelButton={resetForm}
              />
            }
            closable={true}
          />
        </Form>
      )}
    />
  );
};
